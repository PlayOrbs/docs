---
sidebar_position: 5
title: Seasons
description: Season structure, progression, and rewards
---

# Seasons

PlayOrbs operates in seasons, providing regular reset points and fresh competition.

## Season Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEASON LIFECYCLE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Season Start                                                   │
│       │                                                          │
│       ▼                                                          │
│   [60,000 Rounds Play]                                          │
│       │                                                          │
│       │─── Points Accumulate                                     │
│       │─── Season Pool Grows                                     │
│       │─── Leaderboard Updates                                   │
│       │                                                          │
│       ▼                                                          │
│   Season Ends                                                    │
│       │                                                          │
│       ▼                                                          │
│   [Snapshot Created]                                             │
│       │                                                          │
│       │─── Final Rankings Frozen                                 │
│       │─── Pool Finalized                                        │
│       │                                                          │
│       ▼                                                          │
│   [Claims Open]                                                  │
│       │                                                          │
│       │─── Players Claim Pool Share                              │
│       │─── Share = (Your Points / Total Points) × Pool          │
│       │                                                          │
│       ▼                                                          │
│   [Season N+1 Auto-Starts]                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Season Parameters

| Parameter | Value |
|-----------|-------|
| Rounds per season | 60,000 |
| Approximate duration | ~3 months |
| Pool source | 50 PORB per emission |

## Season 0 (Genesis Phase)

Season 0 is special:

| Feature | Season 0 | Season 1+ |
|---------|----------|-----------|
| PORB Emissions | Disabled | Enabled |
| Points | Accumulate for conversion | Earn direct rewards |
| LP Fees | Accumulate toward genesis | Normal operation |
| Season Pool | None | 50 PORB per emission |

After 25 SOL accumulates in the LP vault:
1. Genesis triggers
2. Points convert to PORB (50 points = 1 PORB)
3. Season 1 begins with emissions enabled

## Season Pool

The season pool accumulates from emissions. Per emission, 200 PORB goes to the first 3 joiners and 50 PORB goes to the season pool. The season pool is distributed proportionally at season end.

## Claiming Rewards

After a season ends:

1. **Snapshot Created**: Final rankings frozen
2. **Claims Open**: Players can claim their share
3. **Calculation**: `Your Share = (Your Points / Total Points) × Pool`

Your share is calculated proportionally: Your Season Points / Total Season Points × Season Pool.

## Season Snapshot

When a season ends, a snapshot captures the final state including total points and the pool amount. This ensures fair, immutable distribution.

## Points Tracking

Season points are tracked for the current season and reset at the end of each season. Points determine:
- **Leaderboard ranking**: Your position relative to other players
- **Pool share**: Your proportional share of the season pool rewards

## Season Transition

Seasons transition automatically when enough rounds have been played. A snapshot is created, counters reset, and the new season begins.

## Next Steps

- [Points System](/earning/points-system) - How to earn points
- [Leaderboards](/earning/leaderboards) - Ranking system
- [PORB Emissions](/earning/porb-emissions) - Token rewards
