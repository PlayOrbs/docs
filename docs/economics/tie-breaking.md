---
sidebar_position: 5
title: Tie Breaking
description: Finalization rules for simultaneous eliminations
---

# Tie Breaking

When multiple players are eliminated simultaneously, tie-break rules determine the winner.

## When Tie-Breaking Applies

When all remaining players are eliminated on the same frame (0 players alive), tie-break rules determine the winner.

## Tie-Break Priority

Winners are determined by this hierarchy:

| Priority | Criterion | Higher Wins |
|----------|-----------|-------------|
| 1 | **framesAlive** | Yes |
| 2 | **kills** | Yes |
| 3 | **rosterIndex** | No (lower wins) |

## Rule Chain

Players are compared in order:
1. **framesAlive** (higher wins) - if tied...
2. **kills** (higher wins) - if still tied...
3. **rosterIndex** (lower wins) - guarantees unique winner

## Example Scenarios

### Scenario 1: Different Survival Times
Player A (450 frames, 2 kills) vs Player B (500 frames, 1 kill)
**Winner: Player B** (survived longer)

### Scenario 2: Same Survival, Different Kills
Player A (500 frames, 3 kills) vs Player B (500 frames, 2 kills)
**Winner: Player A** (more kills)

### Scenario 3: Complete Tie
Player A (500 frames, 2 kills, index 4) vs Player B (500 frames, 2 kills, index 2)
**Winner: Player B** (joined earlier)

## Roster Index

Roster index is assigned at join time (first to join = index 0). Using roster index as final tiebreaker:
- Guarantees unique winner
- Slightly favors early joiners
- Provides deterministic resolution

## Finalization Flow

When multiple eliminations occur in the final frame:
1. Check alive count
2. If 1 alive: that player wins 1st place
3. If 0 alive: apply tie-break rules to determine placement order
4. Top 3 receive survival pot splits, 1st place also receives remaining bounty

## Placement Rewards

Tie-break rules determine placement for all players, not just the winner. The top 3 finishers share the survival pot:

| Placement | Survival Share (4+ players) | Survival Share (2-3 players) |
|-----------|----------------------------|------------------------------|
| **1st** | 65% + remaining bounty | 70% + remaining bounty |
| **2nd** | 25% | 30% |
| **3rd** | 10% | — |

## Edge Cases

### All Players Same Frame and Stats
Extremely rare but resolves with lowest roster index.

### Self-Elimination Tie
Still applies tie-break rules with no kill credit for self-elimination.

## Determinism Guarantee

Tie-breaking is fully deterministic: same game state always produces the same winner, verifiable by any observer.

## Strategic Consideration

Knowing tie-break rules affects late-game play:
1. Survive longer if possible
2. Get more kills before the final moment
3. Roster index cannot be changed

## Next Steps

- [Kill Rewards](/economics/kill-rewards) - Bounty schedule
- [Reward Distribution](/economics/payout-mechanics) - Pool distribution
- [Round Mechanics](/gameplay/round-mechanics) - Game flow
