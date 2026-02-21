---
sidebar_position: 3
title: Genesis Bootstrap
description: The fair launch mechanism that creates PORB's initial supply
---

# Genesis Bootstrap

Genesis is the one-time event that transitions from Season 0 to active token emissions.

## Pre-Genesis State (Season 0)

During Season 0, the system operates in bootstrap mode:

| Property | State |
|----------|-------|
| `genesis_done` | false |
| `conversion_open` | false |
| `season_id` | 0 |
| PORB emissions | Disabled |
| LP fees | Accumulating |

## Fee Accumulation

During Season 0, fees accumulate toward genesis:

```
Game Rounds Play
      │
      ├── 80% → Prize Pool (winners)
      │
      └── 20% → Protocol
            │
            ├── 50% → LP Vault (accumulating toward 25 SOL)
            │
            └── 50% → Dev Wallet
```

## Genesis Trigger

When `lp_accum_sol >= 25 SOL`, genesis can be triggered:

```
┌─────────────────────────────────────────────────────────────────┐
│                    GENESIS BOOTSTRAP                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [1] Check Threshold                                            │
│       └── lp_accum_sol >= 25 SOL ✓                              │
│                                                                  │
│   [2] Mint Initial Supply                                        │
│       └── 500,000 PORB → Program Vault                           │
│                                                                  │
│   [3] Create CLMM Pool                                          │
│       └── 250,000 PORB + 25 SOL → Raydium CLMM                   │
│       └── Initial price: 0.0001 SOL/PORB                         │
│       └── Range: -30% lower, ∞ upper                            │
│                                                                  │
│   [4] Lock Position                                              │
│       └── Position NFT locked permanently                       │
│                                                                  │
│   [5] Enable Conversions                                         │
│       └── Season 0 players can convert points → PORB             │
│       └── Rate: 50 points = 1 PORB                               │
│       └── Cap: 250,000 PORB total conversions                    │
│                                                                  │
│   [6] Start Season 1                                             │
│       └── Emissions begin                                        │
│       └── Season pool accumulates                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Conversion Mechanics

### Rate Calculation

The base rate is 50 points per PORB, but may adjust dynamically:

```rust
base_ratio = 50 points per PORB
needed_ratio = max(50, ceil(total_points / 250,000))
points_per_orb_effective = needed_ratio
```

If total season 0 points exceed what 250k PORB can cover at 50:1, the ratio increases to ensure the cap isn't exceeded.

### Conversion Formula

```rust
fn convert_points(stats: &mut PlayerStats, root: &RootAccount) -> u64 {
    let points = stats.season_points;
    let ratio = root.points_per_orb_effective;

    // Calculate PORB (floor division)
    let orbs = points / ratio;

    // Enforce cap
    let remaining = root.genesis_orb_cap - root.orbs_minted_from_conversion;
    let final_orbs = min(orbs, remaining);

    // Consume points
    stats.season_points = 0;

    final_orbs
}
```

### Example

```
Your Season 0 points: 5,000
Conversion rate: 50 points per PORB
Your PORB: 5,000 / 50 = 100 PORB
```

## CLMM Pool Creation

The initial pool is created with:

| Parameter | Value |
|-----------|-------|
| Token Pair | PORB / WSOL |
| Initial Price | 0.0001 SOL/PORB (10,000 PORB per SOL) |
| PORB Added | 250,000 |
| SOL Added | 25 |
| Price Range | -30% to +∞ |

## Position Locking

The CLMM position NFT is **permanently locked**:

- Cannot be withdrawn
- Guarantees permanent liquidity
- Prevents rug pulls
- Builds long-term trust

## Why Genesis Matters

### For Early Players
- Points convert to real tokens
- Early gameplay rewarded
- Fair distribution based on participation

### For the Ecosystem
- Real liquidity from day 1
- No external capital injection needed
- Token backed by actual game fees

### For Trust
- Transparent threshold (25 SOL)
- On-chain verification
- Locked liquidity

## Genesis Parameters

| Parameter | Value |
|-----------|-------|
| Threshold | 25 SOL |
| Genesis PORB Cap | 500,000 PORB |
| Conversion Cap | 250,000 PORB |
| Base Rate | 50 points = 1 PORB |
| Initial Price | 0.0001 SOL/PORB |

## Next Steps

- [Epoch Decay](/tokenomics/epoch-decay) - Post-genesis emission schedule
- [Liquidity Management](/tokenomics/liquidity-management) - Ongoing LP operations
- [Supply Mechanics](/tokenomics/supply-mechanics) - Full supply breakdown
