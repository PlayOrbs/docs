---
sidebar_position: 2
title: Reward Distribution
description: How prize pools are distributed to players
---

# Reward Distribution

The prize pool (85% of entries) splits into bounty and survival pools with distinct distribution rules.

## Pool Structure

The prize pool (85% of entries) splits into bounty (40%) and survival (60%) pools.

## Pool Allocations

| Pool | Share | Distribution |
|------|-------|--------------|
| **Bounty** | 40% | Distributed per kill |
| **Survival** | 60% | Split among top 3 finishers |

## Example Pool Calculation

For 10 players at 1 SOL each:
- **Player Pool**: 8.50 SOL (85%)
- **Bounty Pool**: 3.40 SOL (40% of player pool)
- **Survival Pool**: 5.10 SOL (60% of player pool)

## Bounty Distribution

Bounty is distributed per kill using a log-weighted schedule. Early kills (when more players are alive) earn more than late kills. See [Kill Rewards](/economics/kill-rewards) for the complete bounty schedule.

## Survival Distribution

The survival pool is split among the top finishers based on placement. The split depends on lobby size:

### Lobbies with 4+ Players

| Placement | Share |
|-----------|-------|
| **1st** | 65% |
| **2nd** | 25% |
| **3rd** | 10% |

### Lobbies with 2-3 Players

| Placement | Share |
|-----------|-------|
| **1st** | 70% |
| **2nd** | 30% |

Placement is determined by survival time, then kills, then roster index. See [Tie Breaking](/economics/tie-breaking) for the full ranking rules.

## Final Winner Bonus

The 1st place finisher also receives any remaining undistributed bounty (from self-eliminations, disconnects, or rounding).

## Edge Cases

### Simultaneous Final Elimination
Tie-break rules determine placement order. Top 3 still receive their survival splits.

### Disconnects
Disconnected players are ranked by how long they survived. They still receive survival rewards if they place in the top 3.

### Single Player Remaining
The last player wins 1st place and receives 65% (or 70%) of the survival pool plus remaining bounty. 2nd and 3rd place still receive their survival splits based on when they were eliminated.

## Next Steps

- [Kill Rewards](/economics/kill-rewards) - Detailed bounty schedule
- [Tie Breaking](/economics/tie-breaking) - Placement and finalization rules
