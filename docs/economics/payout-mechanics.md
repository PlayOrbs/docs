---
sidebar_position: 2
title: Reward Distribution
description: How prize pools are distributed to players
---

# Reward Distribution

The prize pool (80% of entries) splits into bounty and survival pools with distinct distribution rules.

## Pool Structure

The prize pool (80% of entries) splits into bounty (70%) and survival (30%) pools.

## Pool Allocations

| Pool | Share | Distribution |
|------|-------|--------------|
| **Bounty** | 70% | Distributed per kill |
| **Survival** | 30% | Winner takes all |

## Example Pool Calculation

For 10 players at 1 SOL each:
- **Player Pool**: 8.00 SOL (80%)
- **Bounty Pool**: 5.60 SOL (70% of player pool)
- **Survival Pool**: 2.40 SOL (30% of player pool)

## Bounty Distribution

Bounty is distributed per kill using a log-weighted schedule. Early kills (when more players are alive) earn more than late kills. See [Kill Rewards](/economics/kill-rewards) for the complete bounty schedule.

## Survival Distribution

The survival pool goes to the last player standing. If all players are eliminated simultaneously, tie-break rules apply.

## Final Winner Reward

The winner receives the survival pool plus any remaining bounty (from self-eliminations or rounding).

## Edge Cases

### All Players EE Out
If all players Early Exit before a winner is determined, the survival pool goes unawarded and players keep their EE amounts.

### Simultaneous Final Elimination
Tie-break rules determine the winner who receives the survival pool.

### Single Player Remaining
The last player cannot EE and automatically wins, receiving survival pool plus remaining bounty.

## Next Steps

- [Kill Rewards](/economics/kill-rewards) - Detailed bounty schedule
- [Bounty Inheritance](/economics/bounty-inheritance) - Kill chaining
- [Tie Breaking](/economics/tie-breaking) - Finalization rules
