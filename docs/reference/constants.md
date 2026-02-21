---
sidebar_position: 2
title: Constants Reference
description: All system constants and parameters
---

# Constants Reference

Complete reference of all configurable and fixed constants in the PlayOrbs system.

## Token Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `TOKEN_DECIMALS` | 9 | PORB token decimal places |
| `TOTAL_SUPPLY_CAP` | 100,000,000 | Maximum PORB supply |
| `INITIAL_EMISSION` | 10 PORB | Starting per-round emission |
| `DECAY_RATE` | 0.85 | Per-epoch decay multiplier |
| `EPOCH_LENGTH` | 10 | Rounds per epoch |

## Fee Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `VAULT_SHARE` | 80% | Prize pool percentage |
| `PROTOCOL_SHARE` | 20% | Protocol fee percentage |
| `LP_SHARE` | 50% | Protocol → LP vault split |
| `REFERRAL_SHARE` | 10% | Dev fee → referrer split |
| `DEV_FEE_BPS` | 2000 | Default protocol fee (20%) |

## Pool Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `BOUNTY_SHARE` | 70% | Prize → bounty split |
| `SURVIVAL_SHARE` | 30% | Prize → survival split |

## Scoring Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `FIRST_PLACE_PTS` | 500 | 1st place bonus |
| `SECOND_PLACE_PTS` | 350 | 2nd place bonus |
| `THIRD_PLACE_PTS` | 250 | 3rd place bonus |
| `KILL_PTS` | 100 | Points per kill |
| `PARTICIPATION_FLOOR_PTS` | 50 | Base participation |

## Physics Constants

### Arena

| Constant | Value | Description |
|----------|-------|-------------|
| `BOUNDARY_SHAPE` | circle | Arena geometry |
| `BOUNDARY_RADIUS` | 190 | Pixels |
| `BOUNDARY_RESTITUTION` | 1.08 | Wall bounce energy |
| `TANGENT_IMPULSE` | 0.02 | Wall sideways kick |
| `MIN_SPEED` | 4.0 | Minimum velocity |
| `MAX_SPEED` | 9.5 | Maximum velocity |
| `TWO_PORBS_MAX_SPEED` | 25.0 | Endgame speed cap |

### Orb

| Constant | Value | Description |
|----------|-------|-------------|
| `PORB_RADIUS` | 12 | Pixels |
| `BASE_SPEED` | 4.0 | Initial velocity |
| `PORB_RESTITUTION` | 1.008 | Collision energy |

### Gravity

| Constant | Value | Description |
|----------|-------|-------------|
| `GRAVITY_BASE` | 0.000001 | Base acceleration |
| `GRAVITY_AMP_FRAC` | 0.4 | Oscillation amplitude |
| `GRAVITY_PERIOD_FRAMES` | 40 | Oscillation period |
| `OSCILLATE_BELOW_PORBS` | 3 | Oscillation threshold |

### Tether

| Constant | Value | Description |
|----------|-------|-------------|
| `HIT_DAMPING` | 0.125 | Break speed reduction |
| `BREAK_SPEED_MIN` | 7.5 | Minimum break speed |
| `IMMUNITY_FRAMES` | 200 | Protection period |

### Shockwave

| Constant | Value | Description |
|----------|-------|-------------|
| `SHOCKWAVE_ENABLED` | true | Toggle |
| `SHOCKWAVE_LIFE_FRAMES` | 40 | Duration |
| `SHOCKWAVE_MAX_RADIUS` | 100 | Maximum size |
| `SHOCKWAVE_RING_THICKNESS` | 5 | Visual width |
| `IMPACT_THRESHOLD` | 8.0 | Trigger velocity |

### Sudden Death

| Constant | Value | Description |
|----------|-------|-------------|
| `SUDDEN_DEATH_ENABLED` | true | Toggle |
| `AFTER_FRAMES` | 600 | Trigger delay (~5s) |
| `DURATION_FRAMES` | 360 | Transition (~3s) |
| `GRAVITY_MULTIPLIER` | 16 | Gravity scaling |
| `CENTER_SHIFT_RADIUS` | 100 | Orbit radius |
| `CENTER_SHIFT_PERIOD` | 150 | Orbit period |
| `PORB_ATTRACTION` | 0.5 | Inter-orb gravity |

## Spawn Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `SPAWN_MODE` | rings | Algorithm |
| `SPAWN_PAD` | 58 | Minimum spacing |
| `START_INSET` | 104 | Distance from boundary |
| `RING_GAP` | 30 | Between-ring distance |
| `RINGS_MIN` | 1 | Minimum rings |
| `RINGS_MAX` | 5 | Maximum rings |
| `SPAWN_VELOCITY` | none | Initial direction |
| `SPAWN_JITTER` | 0 | Random offset |

## Account Size Constants

| Account | Size | Description |
|---------|------|-------------|
| `ROOT_ACCOUNT` | ~560 bytes | Global state |
| `ROUND_PAGE` | ~23.5 KB | 120 rounds |
| `ROUND_META` | 195 bytes | Per round |
| `ROUND_PLAYER` | 86 bytes | Membership |
| `PLAYER_STATS` | 129 bytes | Per-season |
| `VAULT` | ~165 bytes | Prize escrow |
| `SEASON_SNAPSHOT` | 59 bytes | Frozen data |

## Storage Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `PAGE_SIZE` | 120 | Rounds per page |
| `MAX_TIERS` | 16 | Maximum tier count |
| `MAX_PLAYERS` | 65535 | u16 limit |

## Randomness Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `SEED_LENGTH` | 32 | Bytes |
| `MERKLE_TREE_DEPTH` | 20 | Levels |
| `ECDSA_CURVE` | secp256k1 | Signature scheme |
| `HASH_ALGORITHM` | SHA-256 | Digest function |

## Emission Probability Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `HAZARD_RATE` | 1.0 | λ for hazard model |
| `EMISSION_DECAY` | 0.85 | Per-epoch multiplier |
| `MIN_EMISSION` | 0.01 | Minimum PORB/round |

## Time Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `FRAME_RATE` | 120 | FPS |
| `FRAME_DURATION` | 8.33 ms | Per frame |
| `SEASON_DURATION` | 30 days | Default season |

## Configuration Formulas

### Kill Weight

```
w(A) = 1 + log₂(A)
```

### Epoch Emission

```
E(n) = E₀ × (0.85)^n
```

### Gravity Oscillation

```
g(t) = base × (1 + ampFrac × sin(2π × t / period))
```

### Emission Probability

```
P(emit) = 1 - e^(-λ × Σorbits)
```

## Next Steps

- [Glossary](/reference/glossary) - Term definitions
- [Mathematical Proofs](/reference/mathematical-proofs) - Economic proofs
- [Parameter Reference](/physics/parameter-reference) - Physics parameters
