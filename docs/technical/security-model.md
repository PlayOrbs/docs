---
sidebar_position: 5
title: Security Model
description: Access control, verification, and security mechanisms
---

# Security Model

The PlayOrbs program implements multiple layers of security to protect funds and ensure fairness.

## Access Control Matrix

| Operation | Signer Required | Validation |
|-----------|-----------------|------------|
| `initialize_root` | Authority | One-time, PDA constraint |
| `join_round` | Player | Keypair signature |
| `settle_round` | Authority | `has_one = authority` |
| `round_payout` | Authority | `has_one = authority` |
| `update_player_stats` | Authority | `has_one = authority` |
| `convert_points` | Player | Account ownership |
| `claim_season_pool` | Player | Account ownership |
| `manage_liquidity` | Authority | `has_one = authority` |

## Security Mechanisms

### PDA-Based Membership

Instead of on-chain roster arrays, membership is proven via PDAs:

```rust
// RoundPlayer PDA proves membership
seeds = ["rp", tier_id, round_id, player]
```

**Benefits:**
- No array size limits
- Efficient RPC filtering via `memcmp`
- Reduced transaction size
- Prevents roster manipulation

### Idempotency Tracking

Flags prevent double-processing:

```rust
struct RoundPlayer {
    payout_processed: bool,  // Prevents double SOL payout
    stats_applied: bool,     // Prevents double points
}

struct RoundMeta {
    did_emit: bool,          // Prevents duplicate emission
}

struct PlayerStats {
    season_pool_claimed: bool,  // Prevents double claim
}
```

**Enforcement:**
```rust
require!(!round_player.payout_processed, "Already paid");
// ... process payout ...
round_player.payout_processed = true;
```

### Vault Security

Prize pools are held in PDA-controlled vaults:

```rust
// Vault PDA
seeds = ["vault", tier_id, round_id]

// Signing for transfers
let seeds = &[b"vault", &tier_id.to_le_bytes(), &round_id.to_le_bytes(), &[bump]];
let signer = &[&seeds[..]];
```

**Properties:**
- No private key exists
- Only program can authorize transfers
- Funds cannot be extracted by anyone
- Exact payout matching required

### Arithmetic Safety

All arithmetic uses safe operations:

```rust
// Saturating addition
points = points.saturating_add(kill_points);

// Checked division
let share = (points as u128)
    .checked_mul(pool)
    .and_then(|x| x.checked_div(total))
    .ok_or(ErrorCode::MathOverflow)?;
```

**Guarantees:**
- No overflow/underflow panics
- Explicit error handling
- No floating-point arithmetic

### Supply Cap Enforcement

Token minting respects hard caps:

```rust
let cap_atoms = 100_000_000_000_000_000; // 100M PORB
let remaining = cap_atoms.saturating_sub(root.total_minted_orb);
let actual_mint = min(requested, remaining);

root.total_minted_orb = root.total_minted_orb.saturating_add(actual_mint);
```

### Settlement Integrity

Cryptographic verification ensures fair outcomes:

1. **ICP Seed Generation**
   - Threshold randomness from subnet nodes
   - Cannot be predicted or influenced

2. **Merkle Proof Verification**
   - Seed bound to specific round
   - Tamper-evident structure

3. **ECDSA Signature**
   - Proves ICP canister signed the commitment
   - Non-repudiable

## Attack Vectors & Mitigations

| Attack | Mitigation |
|--------|------------|
| **Double-spend payout** | `payout_processed` flag |
| **Double-claim points** | `stats_applied` flag |
| **Emission manipulation** | Deterministic SHA-256 |
| **Supply inflation** | Hard cap + tracking |
| **Vault drain** | PDA-only access |
| **Front-running** | ICP seed generation |
| **Rug pull** | Locked LP position |
| **Authority abuse** | On-chain verification |

## Settlement Verification

```
┌─────────────────────────────────────────────────────────────────┐
│                    VERIFICATION FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [1] Validate chunk ID matches round                            │
│       └── chunk_id == round_id / 50                             │
│                                                                  │
│   [2] Verify ECDSA signature                                     │
│       └── Recovered key == ICP canister key                     │
│                                                                  │
│   [3] Compute leaf hash                                          │
│       └── SHA256("orbs-leaf" || context || seed)                │
│                                                                  │
│   [4] Verify Merkle proof                                        │
│       └── Computed root == signed root                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Threat Model

The system is secure against:

| Threat | Assumption |
|--------|------------|
| **Seed prediction** | ICP subnet majority honest |
| **Seed manipulation** | ECDSA remains secure |
| **Seed substitution** | SHA-256 remains secure |
| **Admin abuse** | Admins can't predict seeds |
| **Replay attacks** | Round-ID binding prevents reuse |

## Trusted Components

| Component | Trust Level |
|-----------|-------------|
| Solana runtime | Consensus security |
| ICP subnet | Threshold cryptography |
| Authority wallet | Operational security |
| Smart contract | Audited code |

## Feature Flags

For testing, verification can be disabled:

```rust
#[cfg(not(feature = "seed-verification"))]
{
    // Skip verification in test builds
    return Ok(());
}
```

**Warning**: Production builds MUST enable `seed-verification`.

## Next Steps

- [Randomness Overview](/randomness/overview) - How randomness works
- [Verification](/randomness/verification) - Proof verification details
