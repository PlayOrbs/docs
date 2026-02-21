---
sidebar_position: 4
title: Verification
description: How seed proofs are verified on-chain
---

# Verification

Every seed proof undergoes a four-step verification process on-chain.

## Verification Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SETTLEMENT VERIFICATION FLOW                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   INPUT: SeedVerificationArgs {                                              │
│       chunk_id: u64,                                                         │
│       merkle_root: [u8; 32],                                                 │
│       root_signature: [u8; 64],                                              │
│       seed: [u8; 32],                                                        │
│       proof_siblings: Vec<[u8; 32]>,                                         │
│       proof_positions: Vec<bool>                                             │
│   }                                                                          │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ STEP 1: Validate Chunk ID                                            │   │
│   │                                                                      │   │
│   │   expected_chunk_id = round_id / 50                                  │   │
│   │   require!(args.chunk_id == expected_chunk_id)                       │   │
│   │                                                                      │   │
│   │   ✓ Ensures seed comes from correct chunk                            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ STEP 2: Verify ECDSA Signature                                       │   │
│   │                                                                      │   │
│   │   message = construct_chunk_root_message(...)                        │   │
│   │   hash = SHA256(message)                                             │   │
│   │   recovered_key = secp256k1_recover(hash, signature)                 │   │
│   │   require!(recovered_key == ORBS_IC_ECDSA_PUB_KEY)                   │   │
│   │                                                                      │   │
│   │   ✓ Proves root was signed by ICP canister                           │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ STEP 3: Compute Leaf Hash                                            │   │
│   │                                                                      │   │
│   │   leaf_hash = SHA256("orbs-leaf" || season_id || tier_id ||         │   │
│   │                       round_id || seed)                              │   │
│   │                                                                      │   │
│   │   ✓ Binds seed to THIS specific round                                │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ STEP 4: Verify Merkle Proof                                          │   │
│   │                                                                      │   │
│   │   computed_root = recompute_path(leaf_hash, siblings, positions)     │   │
│   │   require!(computed_root == merkle_root)                             │   │
│   │                                                                      │   │
│   │   ✓ Proves seed is in the signed Merkle tree                         │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│   OUTPUT: Seed verified and stored in round.seed_hex                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Step 1: Chunk ID Validation

```rust
let expected_chunk_id = round_id / CHUNK_SIZE;
require!(args.chunk_id == expected_chunk_id, "Invalid chunk");
```

Ensures the seed comes from the correct chunk for this round.

## Step 2: Signature Verification

```rust
fn verify_chunk_root_signature(
    season_id: u16,
    tier_id: u8,
    chunk_id: u64,
    merkle_root: &[u8; 32],
    signature: &[u8; 64]
) -> Result<()> {
    // Reconstruct message
    let root_hex = hex_encode(merkle_root);
    let message = format!(
        "OrbsChunkRoot\nSeason:{}\nTier:{}\nChunk:{}\nRoot:{}",
        season_id, tier_id, chunk_id, root_hex
    );

    // Hash message
    let message_hash = sha256(message.as_bytes());

    // Recover public key from signature
    for recovery_id in 0..4 {
        if let Ok(recovered) = secp256k1_recover(&message_hash, recovery_id, signature) {
            let compressed = compress_pubkey(&recovered);

            // Compare to known ICP canister key
            if compressed == ORBS_IC_ECDSA_PUB_KEY {
                return Ok(());
            }
        }
    }

    Err(ErrorCode::InvalidChunkSignature)
}
```

## Step 3: Leaf Hash Computation

```rust
fn compute_leaf_hash(
    season_id: u16,
    tier_id: u8,
    round_id: u64,
    seed: &[u8; 32]
) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(b"orbs-leaf");           // Domain separator
    hasher.update(&season_id.to_le_bytes()); // Season
    hasher.update(&[tier_id]);              // Tier
    hasher.update(&round_id.to_le_bytes()); // Round (CRITICAL)
    hasher.update(seed);                    // Seed value
    hasher.finalize().into()
}
```

The `round_id` binding is critical—it prevents using a proof from one round for another.

## Step 4: Merkle Proof Verification

```rust
fn merkle_verify(
    leaf_hash: [u8; 32],
    proof_siblings: &[[u8; 32]],
    proof_positions: &[bool],  // false=left, true=right
    merkle_root: &[u8; 32]
) -> bool {
    let mut current = leaf_hash;

    for (sibling, &is_right) in proof_siblings.iter().zip(proof_positions) {
        current = if is_right {
            sha256(&[sibling, &current].concat())  // Current is right
        } else {
            sha256(&[&current, sibling].concat())  // Current is left
        };
    }

    current == *merkle_root
}
```

## Security Properties

| Property | Mechanism | Attack Prevented |
|----------|-----------|------------------|
| **Authenticity** | ECDSA signature | Fake seed injection |
| **Integrity** | Merkle proof | Seed tampering |
| **Uniqueness** | Round-ID binding | Cross-round reuse |
| **Pre-commitment** | ICP canister storage | Authority manipulation |
| **Verifiability** | Deterministic hashing | Dispute resolution |

## What Verification Proves

If all steps pass, the verifier has cryptographic assurance that:
- The seed was generated by the ICP Orbs canister
- The seed belongs to the claimed round
- The seed has not been modified since generation

## Next Steps

- [Sequential Revelation](/randomness/sequential-revelation) - Access control
- [Security Model](/technical/security-model) - Full security analysis
- [Settlement Flow](/technical/settlement-flow) - Settlement process
