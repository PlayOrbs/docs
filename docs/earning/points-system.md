---
sidebar_position: 1
title: Points System
description: How points are calculated and accumulated
---

# Points System

Points measure your performance and determine your share of season rewards.

## Points Calculation

```
┌─────────────────────────────────────────────────────────────────┐
│                    POINTS CALCULATION                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Base Points = Placement Bonus + Kill Bonus + Participation    │
│                                                                  │
│   Final Points = Base Points × Tier Multiplier                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Points Constants

| Category | Value | Description |
|----------|-------|-------------|
| **1st Place** | +500 | Winner bonus |
| **2nd Place** | +350 | Runner-up bonus |
| **3rd Place** | +250 | Third place bonus |
| **Kill Bonus** | +100 | Per kill |
| **Participation** | +50 | Minimum for playing |

## Calculation Algorithm

```
points = 50 (participation floor)

if placement == 1: points += 500
if placement == 2: points += 350
if placement == 3: points += 250

points += kills × 100

if cap > 0: points = min(points, cap)

points = points × tier_multiplier / 100
```

## Example Calculations

### Example 1: Winner with Kills
- Placement: 1st
- Kills: 3
- Tier: 1 (1.5x multiplier)

```
Base = 50 + 500 + (3 × 100) = 850
Final = 850 × 1.5 = 1,275 points
```

### Example 2: Middle of Pack
- Placement: 5th
- Kills: 1
- Tier: 0 (1.0x multiplier)

```
Base = 50 + 0 + (1 × 100) = 150
Final = 150 × 1.0 = 150 points
```

### Example 3: High-Tier Win
- Placement: 1st
- Kills: 5
- Tier: 2 (2.0x multiplier)

```
Base = 50 + 500 + (5 × 100) = 1,050
Final = 1,050 × 2.0 = 2,100 points
```

## Points Matrix

| Placement | 0 Kills | 1 Kill | 3 Kills | 5 Kills |
|-----------|---------|--------|---------|---------|
| 1st | 550 | 650 | 850 | 1,050 |
| 2nd | 400 | 500 | 700 | 900 |
| 3rd | 300 | 400 | 600 | 800 |
| 4th+ | 50 | 150 | 350 | 550 |

*Values shown at 1.0x multiplier*

## Tier Multipliers

Higher tiers reward risk with accelerated point earnings:

| Tier | Multiplier | 850 Base Points |
|------|------------|-----------------|
| 0 | 1.0x | 850 |
| 1 | 1.5x | 1,275 |
| 2 | 2.0x | 1,700 |
| 3 | 3.0x | 2,550 |

## Points Accumulation

Points are tracked at two levels:

### Season Points
- Reset each season
- Determine leaderboard ranking
- Calculate season pool share

### Total Points
- Never reset
- Track lifetime achievement
- Unlock permanent rewards

## Points Stats Tracking

```
PlayerStats {
    season_points: u64,
    total_points: u64,
    rounds_played: u32,
    wins: u32,
    kills: u32,
    sol_earned_lamports: u64,
    orb_earned_atoms: u64,
}
```

## Global Tracking

The system also tracks total season points across all players:

```
root.current_season_total_points += delta
```

This enables proportional pool distribution at season end.

## Next Steps

- [Leaderboards](/earning/leaderboards) - Compete for rankings
- [PORB Emissions](/earning/porb-emissions) - Token rewards
- [Seasons](/gameplay/seasons) - Season structure
