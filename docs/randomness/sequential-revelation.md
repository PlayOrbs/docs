---
sidebar_position: 5
title: Sequential Revelation
description: How seed access is controlled to prevent gaming
---

# Sequential Revelation

Seeds are revealed in strict sequence to prevent players from gaming the system.

## The Pre-Fetching Problem

Without controls, an adversary could request seeds for future rounds before those rounds begin. Even without predicting values, they could:

- Wait to see unfavorable seeds and avoid those rounds
- Gain information asymmetry over other players
- Manipulate game mechanics that depend on seed timing

## Enforced Ordering

The ICP canister implements strict sequential access control:

```
1. Each (season, tier) pair maintains a last_settled_round counter
2. Seed requests only honored for last_settled_round + 1
3. After successful revelation, counter increments
4. Requests for already-revealed rounds return cached proofs
5. Requests for future rounds are rejected
```

### Access Control Flow

```
Request: reveal_seed_for_round(season=1, tier=0, round=42)

Check: last_settled_round[1][0] == 41?
  ├── YES → Reveal seed, increment counter to 42
  │         Return SeedProof
  │
  └── NO → Check: round <= last_settled_round?
            ├── YES → Return cached proof (idempotent)
            └── NO  → Reject request (future round)
```

## Idempotency

Duplicate requests for the same round return identical proofs:

```rust
fn reveal_seed(season: u16, tier: u8, round: u64) -> Result<SeedProof> {
    let checkpoint = get_checkpoint(season, tier);

    if round < checkpoint.last_settled {
        // Already revealed - return cached
        return get_cached_proof(season, tier, round);
    }

    if round == checkpoint.last_settled + 1 {
        // Next in sequence - reveal and increment
        let proof = generate_proof(season, tier, round);
        checkpoint.last_settled = round;
        cache_proof(season, tier, round, &proof);
        return Ok(proof);
    }

    // Future round - reject
    Err(Error::FutureRound)
}
```

### Benefits of Idempotency

- **Denial-of-service prevention**: Repeated requests don't cause issues
- **Safe retries**: Network failures can be retried
- **Distributed consistency**: Multiple clients get same proof

## Synchronization with Game

The revelation sequence stays synchronized with game progression:

```
Game Flow                    Canister State
─────────                    ──────────────
Round 41 settles     →      last_settled = 41
Round 42 starts      →      (awaiting settlement)
Round 42 game plays  →      (no reveal yet)
Round 42 ends        →      Request reveal for 42
Settlement tx        ←      Proof returned
                     →      last_settled = 42
Round 43 starts      →      (awaiting settlement)
```

## Preventing Gaming

| Attack | Mitigation |
|--------|------------|
| **Pre-fetch future seeds** | Rejected—counter must match |
| **Selective round avoidance** | Seeds unknown until settlement |
| **Replay old proofs** | Round-ID binding invalidates them |
| **Information asymmetry** | All players face same uncertainty |

## Round Snapshots

Beyond seeds, the canister tracks round outcomes:

```rust
struct RoundSnapshot {
    round_id: u64,
    participants: Vec<PlayerRecord>,
    outcomes: Vec<Outcome>,
    settled_at: Timestamp,
}
```

This historical record enables:
- Leaderboard computation
- Player statistics
- Dispute resolution
- Analytics

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| `FutureRound` | Requested round > next | Wait for preceding rounds |
| `ChunkNotGenerated` | Chunk doesn't exist | Admin generates chunk |
| `InvalidContext` | Wrong season/tier | Check parameters |

## Batched Updates

For large rounds, results are submitted in batches:

```rust
// Submit up to 50 player outcomes per call
submit_round_outcomes(
    season: u16,
    tier: u8,
    round: u64,
    outcomes: Vec<PlayerOutcome>,  // max 50
) -> Result<()>
```

Multiple batched submissions are combined with automatic deduplication.

## Performance Considerations

| Operation | Latency |
|-----------|---------|
| Reveal from cache | ~100ms |
| First reveal (new round) | ~200ms |
| New chunk generation | ~2s |

Chunks are generated proactively to avoid blocking settlement.

## Next Steps

- [Verification](/randomness/verification) - Proof verification
- [Settlement Flow](/technical/settlement-flow) - On-chain settlement
- [Security Model](/technical/security-model) - Full security analysis
