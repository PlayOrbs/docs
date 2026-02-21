---
sidebar_position: 3
title: Seed Generation
description: How cryptographic seeds are derived and committed
---

# Seed Generation

Seeds are derived from ICP's threshold randomness and committed via Merkle trees.

## Derivation Process

When a new chunk is needed:

1. **Obtain master seed** from `raw_rand()` (32 bytes)
2. **Derive 50 individual seeds** using indexed hashing
3. **Immediately discard** master seed

```rust
// Derive seed for index i
seed[i] = SHA256(master_seed || i.to_be_bytes())
```

### Security Properties

- Each derived seed is uniformly random
- Seeds within a chunk are independent
- Master seed cannot be recovered from derived seeds
- Master seed is **never stored**

## Merkle Tree Construction

The 50 seeds form leaves of a Merkle tree with contextual binding.

### Leaf Construction

```
leaf_hash = SHA256("orbs-leaf" || season_id || tier_id || round_id || seed)

Components:
├── "orbs-leaf"  - Domain separator (9 bytes)
├── season_id    - Season identifier (u16 LE, 2 bytes)
├── tier_id      - Tier identifier (u8, 1 byte)
├── round_id     - Round identifier (u64 LE, 8 bytes)  [CRITICAL]
└── seed         - Random seed value (32 bytes)
```

**Security**: The `round_id` in the leaf hash prevents proof reuse—the same seed proof cannot be used for a different round.

### Tree Structure

```
                    ┌─────────────────────────────────────┐
                    │           MERKLE ROOT               │
                    │         (Signed by ICP)             │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────┴───────────────────┐
                    │                                     │
              ┌─────┴─────┐                         ┌─────┴─────┐
              │  Node A   │                         │  Node B   │
              └─────┬─────┘                         └─────┬─────┘
                    │                                     │
            ┌───────┴───────┐                     ┌───────┴───────┐
            │               │                     │               │
       ┌────┴────┐     ┌────┴────┐           ┌────┴────┐     ┌────┴────┐
       │ Leaf 0  │     │ Leaf 1  │           │ Leaf 2  │     │ Leaf 3  │
       │ (Rd 0)  │     │ (Rd 1)  │           │ (Rd 2)  │     │ (Rd 3)  │
       └─────────┘     └─────────┘           └─────────┘     └─────────┘
```

### Internal Nodes

```rust
internal_node = SHA256(left_child || right_child)
```

The tree is padded to a power of two with zero hashes.

## Threshold ECDSA Signing

The Merkle root is signed using ICP's threshold ECDSA:

### Signed Message Format

```
Message = "OrbsChunkRoot\nSeason:{season_id}\nTier:{tier_id}\nChunk:{chunk_id}\nRoot:{root_hex}"

Example:
"OrbsChunkRoot\nSeason:1\nTier:0\nChunk:5\nRoot:a1b2c3...f9"
```

### Signature Properties

| Property | Value |
|----------|-------|
| Curve | secp256k1 |
| Signature Size | 64 bytes (r, s) |
| Public Key | 33 bytes (compressed) |
| Hash Function | SHA-256 |

The signature transforms the Merkle root into a **cryptographic commitment** by the ICP network.

## Seed Proof Structure

When a seed is revealed:

```rust
struct SeedProof {
    seed: [u8; 32],              // The random value
    chunk_id: u64,               // Chunk identifier
    merkle_root: [u8; 32],       // Root hash
    root_signature: [u8; 64],    // ECDSA signature
    proof_siblings: Vec<[u8; 32]>, // Path siblings
    proof_positions: Vec<bool>,  // Left/right indicators
}
```

## Verification Requirements

Any party can verify a seed proof with:
- The canister's ECDSA public key
- The proof data itself
- Standard cryptographic libraries

No special access or trust relationship required.

## Next Steps

- [Verification](/randomness/verification) - Full verification process
- [Sequential Revelation](/randomness/sequential-revelation) - Access control
- [Security Model](/technical/security-model) - Security analysis
