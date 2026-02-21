---
sidebar_position: 2
title: ICP Integration
description: Internet Computer Protocol canister architecture
---

# ICP Integration

The ICP Orbs canister provides cryptographically verifiable random seeds for game settlement.

## Hierarchical Organization

Seeds are organized in a three-level hierarchy:

### Seasons
Temporal epochs (monthly or quarterly periods) that reset leaderboards and statistics. Each season is identified by a 16-bit integer.

### Tiers
Different gameplay categories within a season—varying by entry level or game mode. Each tier operates independently.

### Rounds
Individual game instances. Each round receives a unique, verifiable random seed.

This hierarchy enables flexible organization while maintaining cryptographic isolation.

## The Chunk Model

Seeds are produced in batches called **chunks**:

```
Chunk 0: Rounds 0-49
Chunk 1: Rounds 50-99
Chunk 2: Rounds 100-149
...
```

### Advantages

| Benefit | Description |
|---------|-------------|
| **Efficiency** | Single signing operation covers 50 seeds |
| **Minimal Storage** | One active chunk per tier |
| **Atomic Commitment** | All seeds committed simultaneously |

### Chunk Calculation

```
chunk_id = round_id / 50
offset = round_id % 50
```

## Canister Functions

The ICP canister provides these key functions:

### Generate Chunk (Admin)

```rust
generate_and_store_chunk(
    season_id: u16,
    tier_id: u8,
    chunk_id: u64
) -> Result<u64>
```

Generates 50 seeds, builds Merkle tree, signs root.

### Reveal Seed (Public)

```rust
reveal_seed_for_round(
    season_id: u16,
    tier_id: u8,
    round_id: u64
) -> Result<SeedProof>
```

Returns seed with full verification proof.

### Check Chunk (Public)

```rust
chunk_exists(
    season_id: u16,
    tier_id: u8,
    chunk_id: u64
) -> bool
```

Verifies if a chunk has been generated.

## Persistent State

The canister maintains:

| Data | Purpose |
|------|---------|
| **Player Registry** | Registered player identities |
| **Round Snapshots** | Historical record of outcomes |
| **Seed Proofs** | Publicly revealed seeds |
| **Access Checkpoints** | Sequential revelation state |
| **Engine Configs** | Immutable game logic versions |

All state uses stable memory for upgrade persistence.

## Entropy Source

The canister derives randomness from ICP's `raw_rand()` function:

```rust
// Obtain 32 bytes of randomness
let master_seed = raw_rand().await?;
```

This randomness is generated through threshold BLS signatures across subnet nodes. A supermajority would need to collude to predict the output.

## Integration Architecture

### For Game Developers

1. Register players through admin API
2. Request seed revelation when rounds complete
3. Store round results for statistics
4. Query player history for leaderboards

### For Auditors

- Check all revealed seed proofs
- Compare round outcomes against seeds
- Validate engine configuration consistency
- Monitor sequential revelation compliance

## Performance Characteristics

### Throughput
- 50 seeds per chunk amortize signing costs
- Seed revelation is simple lookup + proof extraction
- New chunks generated asynchronously

### Storage
- One active chunk per tier
- Historical proofs for revealed seeds only
- Bounded memory usage

### Latency
- Revelation from existing chunk: single call
- New chunk: one `raw_rand()` + one ECDSA sign
- Proactive generation prevents blocking

## Next Steps

- [Seed Generation](/randomness/seed-generation) - How seeds are derived
- [Verification](/randomness/verification) - Proof structure
- [Sequential Revelation](/randomness/sequential-revelation) - Access control
