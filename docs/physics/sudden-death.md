---
sidebar_position: 6
title: Sudden Death
description: Endgame acceleration when matches run long
---

# Sudden Death

Sudden death activates when matches run long, dramatically increasing intensity to force a conclusion.

## Configuration Parameters

| Parameter | Description | Effect |
|-----------|-------------|--------|
| **enabled** | Toggle sudden death | Activates time-based pressure |
| **afterFrames** | Trigger delay from start | Time before activation |
| **gravityMultiplier** | Gravity scaling | Dramatically increases pull |
| **centerShiftRadius** | Gravity center orbit | Creates moving gravity well |
| **centerShiftPeriodFrames** | Center orbit period | Controls spiral speed |
| **orbAttraction** | Inter-orb gravity | Draws orbs together |
| **tangentImpulseMul** | Boundary kick multiplier | Increases bounce chaos |
| **restitutionMul** | Bounce energy multiplier | More energetic collisions |

## Current Configuration

```
Enabled:           Yes
Trigger:           600 frames (~5 seconds)
Gravity:           2x multiplier
Center Shift:      0.1 radius, 150-frame period
Orb Attraction:    0
Tangent Impulse:   5x multiplier
Restitution:       1.2x multiplier
```

## Activation Timeline

```
Frame 0      Game starts
    │
Frame 600    Sudden death begins (when 2 orbs remain)
    │        ├── Gravity increases (2x)
    │        ├── Boundary kicks amplified (5x)
    │        ├── Bounce energy increased (1.2x)
    │        └── Center starts spiraling
    │
    ▼
Game ends    When 1 unique player remains
             (splits allowed - tracks owners, not orb count)
```

## Effects

Gravity multiplies over the transition period. 
The gravity center orbits, creating a whirlpool effect.
Orbs are pulled toward each other, this forces confrontation between remaining orbs.

During sudden death:
- Boundary bounces become more chaotic (5x tangent impulse)
- Collisions are more energetic (1.2x restitution)
- Gravity center spirals, creating a whirlpool
- Orb splits are allowed (game tracks unique players, not orb count)


## Gameplay Impact

| Phase | Gameplay |
|-------|----------|
| **Normal** | Tactical, spacing matters |
| **Early SD** | Center becomes dangerous |
| **Mid SD** | Hard to avoid center |
| **Full SD** | Chaotic, forced confrontation |

## Design Purpose

Sudden death serves multiple purposes:

1. **Time limit**: Prevents infinite games
2. **Excitement**: Dramatic finish
3. **Fairness**: Forces resolution

## Next Steps

- [Parameter Reference](/physics/parameter-reference) - All parameters
- [Engine Overview](/physics/engine-overview) - Full engine architecture
- [Gravity System](/physics/gravity-system) - Normal gravity mechanics
