---
sidebar_position: 2
title: Boundary System
description: Arena geometry and wall collision mechanics
---

# Boundary System

The boundary defines the arena in which orbs interact.

## Configuration Parameters

| Parameter | Description | Effect |
|-----------|-------------|--------|
| **shape** | Arena geometry | Collision math and visuals |
| **radius** | Circle boundary radius in pixels | Larger = more open arena |
| **restitution** | Energy multiplier on wall bounce | `>1.0` accelerates, `<1.0` dampens |
| **tangentImpulse** | Sideways kick on wall collision | Higher = more chaotic bounces |
| **minSpeed** | Floor velocity magnitude | Prevents stalling |
| **maxSpeed** | Ceiling velocity magnitude | Caps maximum speed |
| **twoOrbsMaxSpeed** | Elevated speed cap for endgame | Faster final confrontations |
| **twoOrbsRampFrames** | Transition duration | Smooths speed increase |

## Current Configuration

```
Shape:           Circle
Radius:          190px
Restitution:     1.02 (slightly accelerating)
Tangent Impulse: 0.01 (minimal sideways kick)
Min Speed:       2.0
Max Speed:       8.0 (normal), 20.0 (endgame)
Endgame Ramp:    400 frames (~3.3 seconds)
Direction:       Random per bounce (CW/CCW)
```

## Wall Collision Physics

When an orb hits the boundary:

### 1. Detect Collision
```
distance_from_center > radius - orb_radius
```

### 2. Calculate Response
```
normal = normalize(position - center)  // For circle
velocity_normal = dot(velocity, normal)
velocity_tangent = velocity - (velocity_normal * normal)
```

### 3. Apply Restitution
```
new_velocity_normal = -velocity_normal * restitution
new_velocity = new_velocity_normal * normal + velocity_tangent
```

### 4. Apply Tangent Impulse
```
tangent_direction = perpendicular(normal)
direction_sign = random_per_bounce()  // +1 or -1, deterministic per orb
new_velocity += tangent_direction * tangentImpulse * direction_sign
```

The tangent direction is randomized per bounce (clockwise or counter-clockwise), creating varied orbital patterns while maintaining determinism through per-orb PRNGs.

## Next Steps

- [Gravity System](/physics/gravity-system) - Central gravity
- [Collision Physics](/physics/collision-physics) - Orb-orb collisions
- [Sudden Death](/physics/sudden-death) - Endgame mechanics
