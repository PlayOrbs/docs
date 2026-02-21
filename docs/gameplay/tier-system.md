---
sidebar_position: 3
title: Tier System
description: Understanding competition tiers and their configurations
---

# Tier System

Tiers define different competition levels with varying entry fees, player limits, and rewards.

## Tier Configuration

Each tier has independent parameters:

| Parameter | Description |
|-----------|-------------|
| `tier_id` | Unique identifier (0-15) |
| `entry_lamports` | Entry fee in lamports |
| `min_players` | Minimum to start countdown |
| `max_players` | Maximum capacity |
| `countdown_secs` | Countdown duration |
| `take_profit` | Optional TP fee |
| `points_multiplier` | Scoring multiplier |

## Choosing a Tier

Check the game interface for current tier configurations.

Consider these factors:

### Risk Tolerance
- **Lower tiers**: Smaller entry, smaller prizes
- **Higher tiers**: Bigger entry fees, bigger rewards

### Skill Level
- **Casual players**: Start with Tier 0
- **Experienced players**: Move to higher tiers for better rewards

### Points Strategy
- Higher tiers have **multipliers** that boost your points
- Same performance in Tier 2 (2.0x) earns double the points of Tier 0 (1.0x)

### Emission Opportunity
- All tiers can trigger PORB emissions
- First 3 joiners benefit regardless of tier

## Points Multiplier Effect

The multiplier scales your final points:

| Tier | Base Points | Multiplier | Final Points |
|------|-------------|------------|--------------|
| 0 | 850 | 1.0x | 850 |
| 1 | 850 | 1.5x | 1,275 |
| 2 | 850 | 2.0x | 1,700 |
| 3 | 850 | 3.0x | 2,550 |

Higher tiers reward commitment with accelerated leaderboard climbing.

## Next Steps

- [Early Exit](/gameplay/take-profit) - Early exit mechanics
- [Points System](/earning/points-system) - How points are calculated
- [Seasons](/gameplay/seasons) - Season structure and rewards
