---
sidebar_position: 5
title: Split Mechanic
description: High-impact collisions can split orbs into two
---

# Split Mechanic

When orbs collide with enough force, they can split into two smaller orbs. This creates dynamic endgame scenarios.

## Configuration Parameters

| Parameter | Description | Effect |
|-----------|-------------|--------|
| **enabled** | Toggle split mechanic | Enables/disables splitting |
| **enableBelowOrbs** | Orb count threshold | Only allows splits when ≤ N orbs remain |
| **vnThreshold** | Normal velocity threshold | Minimum impact speed to trigger |
| **keThreshold** | Kinetic energy threshold | Minimum collision energy |
| **radiusScale** | Child orb size | Multiplier for split orb radius |
| **childSpeedMul** | Child velocity | Speed multiplier for split orbs |
| **angleSpread** | Separation angle | How far apart children fly |
| **maxGenerations** | Split depth limit | Prevents infinite splitting |
| **cooldownFrames** | Split cooldown | Frames before orb can split again |
| **maxOrbsCap** | Maximum orbs | Hard cap on total orbs in arena |

## Current Configuration

```
Enabled:           Yes
Enable Below:      2 orbs (only in endgame)
VN Threshold:      5.5
KE Threshold:      25.0
Radius Scale:      1.0 (same size)
Child Speed:       0.5x parent speed
Angle Spread:      0.45 radians
Max Generations:   2
Cooldown:          180 frames
Max Orbs Cap:      24
```

## How Splitting Works

### 1. Trigger Conditions
```
collision_speed > vnThreshold
AND kinetic_energy > keThreshold
AND orbs_in_arena <= enableBelowOrbs
AND orb.generation < maxGenerations
AND orb.cooldown == 0
```

### 2. Split Process
```
parent_orb → child_orb_1 + child_orb_2

Both children:
- Inherit parent's owner (same player)
- Have reduced speed (childSpeedMul)
- Fly apart at angleSpread
- Start with cooldownFrames
```

### 3. Ownership Tracking

**Critical**: Split children inherit the parent's owner. The game tracks **unique players**, not orb count:

```
Game ends when: countUniqueOwners(orbs) <= 1

Player A has 3 orbs (split twice) → counts as 1 player
Player B has 1 orb                → counts as 1 player
Total orbs: 4, Unique players: 2  → game continues

Player B eliminated:
Player A has 3 orbs               → counts as 1 player
Total orbs: 3, Unique players: 1  → game ENDS
```

## Gameplay Impact

| Scenario | Effect |
|----------|--------|
| **Endgame 1v1** | Splits create chaos, harder to track |
| **High-speed collision** | Both orbs may split simultaneously |
| **Split child eliminated** | Player still alive if other orbs remain |

## Design Purpose

1. **Endgame excitement**: More action when only 2 players remain
2. **Skill expression**: Managing multiple orbs
3. **Comeback potential**: Split orbs can survive longer
4. **Visual spectacle**: Dramatic split effects

## Next Steps

- [Sudden Death](/physics/sudden-death) - Endgame mechanics
- [Collision Physics](/physics/collision-physics) - Collision detection
- [Parameter Reference](/physics/parameter-reference) - All parameters
