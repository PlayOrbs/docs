---
sidebar_position: 3
title: Gravity System
description: Central gravity and oscillation mechanics
---

# Gravity System

Central gravity pulls orbs toward the arena center, with optional oscillation for drama.

## Configuration Parameters

| Parameter | Description | Effect |
|-----------|-------------|--------|
| **base** | Constant gravitational acceleration | Higher = compressed gameplay |
| **ampFrac** | Oscillation amplitude as fraction of base | Creates pulsing waves |
| **periodFrames** | Oscillation cycle length | Faster = more chaotic |
| **oscillateBelowOrbs** | Threshold to enable oscillation | Endgame activation |

## Current Configuration

```
Base Gravity:      0.000001 (very subtle)
Amplitude:         40% of base
Period:            40 frames (~0.33 seconds)
Activates Below:   3 orbs
```


## Oscillation Behavior

When oscillation activates:

```
Time     Multiplier    Effect
────     ──────────    ──────
0%       1.0x          Normal pull
25%      1.4x          Stronger pull (peak)
50%      1.0x          Normal pull
75%      0.6x          Weaker pull (trough)
100%     1.0x          Cycle repeats
```


## Gravity Effects on Gameplay

| Gravity Level | Effect |
|---------------|--------|
| Very low (current) | Orbits stay spread, tactical play |
| Low | Slight center bias |
| Medium | Quick center engagements |
| High | Chaotic center collisions |

## Sudden Death Gravity

During sudden death, gravity multiplies dramatically.

See [Sudden Death](/physics/sudden-death) for details.

## Next Steps

- [Collision Physics](/physics/collision-physics) - Orb-orb interactions
- [Tether System](/physics/tether-system) - Elastic connections
- [Sudden Death](/physics/sudden-death) - Endgame gravity
