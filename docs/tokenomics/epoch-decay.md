---
sidebar_position: 4
title: Epoch Decay
description: How emissions decrease over time for long-term sustainability
---

# Epoch Decay

Emissions decrease over time through epoch-based decay, ensuring long-term sustainability.

## Epoch Definition

```
epoch_index = floor(total_rounds_since_genesis / epoch_rounds)

Where:
- epoch_rounds = 525,600 (default)
- At ~2 min/round: 1 epoch ≈ 2 years
```

## Decay Formula

Emissions follow a geometric decay:

```
E(n) = E₀ × r^n

Where:
- E(n) = emission at epoch n
- E₀ = base emission (250 PORB)
- r = retention rate (0.85 = 85%)
- n = epoch_index
```

## Decay Visualization

```
PORB per Emission
250 │●
    │  ●
212 │    ●
    │      ●
180 │        ●
    │          ●
153 │            ●
    │              ●
130 │                ●
    └──────────────────────────
     E0  E1  E2  E3  E4  E5
          Epoch (2 years each)
```

## Implementation

```rust
fn apply_decay(base: u128, epoch: u32, decay_bps: u16) -> u128 {
    if epoch == 0 {
        return base;
    }

    let mut result = base;
    for _ in 0..epoch {
        result = result * decay_bps as u128 / 10_000;
    }

    result
}

// Examples (base = 250, decay_bps = 8500):
// Epoch 0: 250 PORB
// Epoch 1: 250 × 0.85 = 212.5 PORB
// Epoch 2: 250 × 0.85² = 180.6 PORB
// Epoch 3: 250 × 0.85³ = 153.5 PORB
```

## Emission Schedule

| Epoch | Years | Per Emission | ~Annual Emissions |
|-------|-------|--------------|-------------------|
| 0 | 0-2 | 250 PORB | 6.5M PORB |
| 1 | 2-4 | 212 PORB | 5.5M PORB |
| 2 | 4-6 | 180 PORB | 4.7M PORB |
| 3 | 6-8 | 153 PORB | 4.0M PORB |
| 4 | 8-10 | 130 PORB | 3.4M PORB |
| 5 | 10-12 | 111 PORB | 2.9M PORB |
| 10 | 20-22 | 49 PORB | 1.3M PORB |
| 20 | 40-42 | 10 PORB | 0.3M PORB |

## Cumulative Distribution

| Year | Cumulative Emissions | % of Budget |
|------|---------------------|-------------|
| 2 | ~6.5M PORB | 6.5% |
| 4 | ~12.0M PORB | 12.1% |
| 10 | ~24.1M PORB | 24.2% |
| 20 | ~37.0M PORB | 37.2% |
| ∞ | ~43.8M PORB | 44.0% |

The system never depletes the full 99.5M budget, ensuring extreme longevity.

## Epoch Rollover

When a new epoch begins:

```rust
fn check_epoch_rollover(root: &mut RootAccount) {
    let new_epoch = (root.total_rounds_since_genesis / root.epoch_rounds) as u32;

    if new_epoch > root.epoch_index {
        emit!(EpochRolled {
            old_epoch: root.epoch_index,
            new_epoch,
            total_rounds: root.total_rounds_since_genesis,
        });

        root.epoch_index = new_epoch;
    }
}
```

## Decay Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `EPOCH_ROUNDS_DEFAULT` | 525,600 | Rounds per epoch |
| `DECAY_BPS_DEFAULT` | 8,500 | 85% retention (15% decay) |
| `EMIT_BASE_DEFAULT` | 250 PORB | Base emission |

## Mathematical Proof

**Theorem**: Total emissions converge to a finite value.

**Proof**:
```
Total = Σ(n=0 to ∞) E₀ × r^n × N
      = E₀ × N × (1 / (1 - r))
      = 250 × 26,280 × 6.67
      ≈ 43.8M PORB
```

Where N ≈ 26,280 emissions per epoch (average gap = 10 rounds).

This is well under the 99.5M budget. ∎

## Why Decay Matters

### Sustainability
- Prevents rapid token depletion
- Ensures rewards for future players
- Creates predictable economics

### Scarcity
- Early participants get higher rewards
- Creates natural value appreciation pressure
- Rewards early adoption

### Balance
- Fast enough to be meaningful
- Slow enough to last 100+ years
- Gradual transition, no sudden drops

## Next Steps

- [Supply Mechanics](/tokenomics/supply-mechanics) - Full supply structure
- [Liquidity Management](/tokenomics/liquidity-management) - LP operations
- [Economic Sustainability](/tokenomics/economic-sustainability) - The value loop
