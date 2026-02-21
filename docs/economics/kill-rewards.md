---
sidebar_position: 3
title: Kill Rewards
description: Log-weighted bounty schedule for eliminations
---

# Kill Rewards

Kill rewards follow a log-weighted schedule where early kills pay more than late kills.

## Core Concept

Kill rewards are calculated using a logarithmic weight formula where the reward decreases as fewer players remain alive. This means early kills (when more players are alive) earn more than late kills.

## Weight Function

The weight increases logarithmically with alive count:

| Alive Before | w(A) = 1 + log₂(A) | Interpretation |
|--------------|---------------------|----------------|
| 2 | 2.00 | Final kill |
| 3 | 2.58 | |
| 4 | 3.00 | |
| 5 | 3.32 | |
| 6 | 3.58 | |
| 8 | 4.00 | |
| 10 | 4.32 | |
| 16 | 5.00 | |
| 32 | 6.00 | |
| 64 | 7.00 | |

## Why Log-Weighting?

1. **Rewards aggression**: Early kills when it's hardest pay most
2. **Diminishing returns**: Prevents snowballing from late kills
3. **Strategic depth**: Risk/reward for early engagement
4. **Sum preservation**: All bounty gets distributed

## Exact Sum Property

The schedule guarantees that the exact sum equals the bounty pool. Any rounding remainder is distributed to the earliest kills.

## Schedule Precomputation

The kill schedule is computed once at round start and never rescaled mid-round. This ensures determinism regardless of elimination order.

## Edge Cases

### Self-Elimination
If a player eliminates themselves, no kill credit is given and the bounty for that slot remains in the pool, going to the winner at finalization.

### Multiple Kills Same Frame
When multiple kills happen in the same frame, they are processed in order determined by the game engine.

### Bounty Depletion
If all bounty is distributed, later kills pay nothing, though EE can still trigger if the target was already met.

## Scaling with Player Count

| Players | First Kill | Last Kill | Ratio |
|---------|------------|-----------|-------|
| 5 | ~1.25x avg | ~0.75x avg | 1.66x |
| 10 | ~1.40x avg | ~0.65x avg | 2.16x |
| 20 | ~1.55x avg | ~0.55x avg | 2.82x |
| 50 | ~1.70x avg | ~0.45x avg | 3.78x |

Larger rounds have steeper reward curves.

## Next Steps

- [Bounty Inheritance](/economics/bounty-inheritance) - Kill chaining
- [Reward Distribution](/economics/payout-mechanics) - Pool structure
- [Take Profit](/gameplay/take-profit) - Securing kill earnings
