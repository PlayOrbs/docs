---
sidebar_position: 5
title: Matrix Game
description: The pre-round memory mini-game for earning skill points
---

# Matrix Game

The Matrix is a memory-based mini-game played before each round. Your performance determines how many **Skill Points (SP)** you earn to allocate across your orb's abilities.

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      MATRIX GAME FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [1] REVEAL → [2] HUNT → [3] SHUFFLE → [4] RESULTS → [5] ALLOCATE
│                                                                 │
│   Memorize      Find SP     Grid        See what     Distribute │
│   SP tiles      tiles       scrambles   you missed   your SP    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Game Phases

### Phase 1: Reveal (Memorize)

Tiles are revealed **one at a time** in sequence. Some tiles contain Skill Points marked with "SP" — memorize their positions.

- Duration: ~7 seconds
- Anti-screenshot: Tiles flash briefly, preventing easy capture
- Strategy: Focus on a region rather than trying to memorize all

### Phase 2: Hunt

The grid is hidden. Click tiles to find the SP you memorized.

| Element | Description |
|---------|-------------|
| **Timer** | Countdown until hunt phase ends |
| **Clicks** | Limited number of attempts |
| **?** | Hidden tile (clickable) |
| **+1** | Successfully found SP |
| **X** | Miss (no SP on that tile) |

### Phase 3: Shuffle

After finding **2 or more SP**, the grid shuffles to increase difficulty:

- Rows and columns slide in random directions
- Tiles wrap around (carousel effect)
- Multiple shuffle steps occur in sequence
- You must track positions mentally as they move

### Phase 4: Results (Post-Reveal)

Shows your performance:
- Tiles you successfully collected
- SP tiles you missed
- Your total earned SP

### Phase 5: Allocate

Distribute your earned SP across three skills:

- **Split Aggro** — More splitting, but weaker children
- **Tether Resistance** — Break enemy tethers easier
- **Orb Power** — Higher maximum speed

Maximum of **4 points** per skill.

## Configuration

Default Matrix settings:

| Parameter | Value | Description |
|-----------|-------|-------------|
| Grid Size | 6x6 | 36 total tiles |
| SP Tiles | 9 | Skill point tiles hidden in grid |
| Max Per Skill | 4 | Maximum allocation per skill |
| Hunt Duration | Varies | Time to find tiles |
| Max Clicks | Varies | Click limit per attempt |

## Skill Point Conversion

Skill points convert to multipliers using a **diminishing returns** curve:

```
multiplier = 1 + 0.5 * (1 - e^(-0.5 * points))
```

| Points | Multiplier | Bonus |
|--------|------------|-------|
| 0 | 1.00x | +0% |
| 1 | 1.11x | +11% |
| 2 | 1.18x | +18% |
| 3 | 1.22x | +22% |
| 4 | 1.24x | +24% |

This curve rewards putting at least 1-2 points into each skill rather than maxing a single skill.

## Strategic Tips

### Memorization Strategies

1. **Zone Focus**: Pick one area of the grid to memorize well rather than the entire board
2. **Pattern Recognition**: Look for clusters or diagonal patterns in SP placement
3. **Edge Anchoring**: Tiles on edges are easier to track during shuffle

### Hunt Phase

1. **Start with confident picks**: Click tiles you're sure about first
2. **Save clicks**: Don't guess randomly — clicks are limited
3. **Track during shuffle**: Watch the animations carefully

### Allocation Strategy

| Strategy | Split | Tether | Power | Playstyle |
|----------|-------|--------|-------|-----------|
| **Balanced** | 1-2 | 1-2 | 1-2 | Flexible, adapts to situation |
| **Aggressive** | 0 | 3-4 | 1-2 | Focuses on eliminations |
| **Swarm** | 3-4 | 1 | 0 | Many orbs, numerical advantage |
| **Speed** | 0 | 1-2 | 3-4 | Fast movement, hard to dodge |

## Determinism

The Matrix game is **deterministic per player per round**:

- Your personal seed is derived from: `sha256(round_seed || tier_id || player || round_id)`
- Same seed always produces same SP tile positions
- Your clicks determine outcome, not randomness during play

This ensures fairness — the game tests memory and attention, not luck.

## Server Validation

All Matrix results are validated server-side:

1. **Click events** are recorded with timestamps
2. **SP earned** is calculated by the server, not client
3. **Transcript** of all events is stored for verification
4. **Immutable** once submitted — cannot be replayed or modified

## Next Steps

- [Skills & Strategy](/gameplay/skills-strategy) — Detailed skill mechanics
- [Round Mechanics](/gameplay/round-mechanics) — How rounds work
- [Spawn Position](/gameplay/getting-started) — Choosing your starting position
