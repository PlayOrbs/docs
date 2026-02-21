---
sidebar_position: 7
title: Parameter Reference
description: Complete reference of all physics parameters
---

# Parameter Reference

Complete reference of all configurable physics parameters.

## Boundary Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `shape` | string | `"circle"` | Arena geometry |
| `radius` | number | 190 | Circle radius in pixels |
| `restitution` | number | 1.08 | Wall bounce energy multiplier |
| `tangentImpulse` | number | 0.02 | Sideways kick on wall collision |
| `minSpeed` | number | 4.0 | Floor velocity magnitude |
| `maxSpeed` | number | 9.5 | Ceiling velocity magnitude |
| `twoOrbsMaxSpeed` | number | 25.0 | Endgame speed cap |
| `twoOrbsRampFrames` | number | 300 | Speed ramp transition |

## Orb Properties

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `radius` | number | 12 | Orb size in pixels |
| `baseSpeed` | number | 4.0 | Initial velocity |
| `colors` | array | 6 colors | Available palette |

## Spawn Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | string | `"rings"` | Spawn algorithm |
| `pad` | number | 58 | Minimum spacing |
| `startInset` | number | 104 | Distance from boundary |
| `ringGap` | number | 30 | Between ring distance |
| `ringsMin` | number | 1 | Minimum ring count |
| `ringsMax` | number | 5 | Maximum ring count |
| `velocity` | string | `"none"` | Initial direction |
| `jitter` | number | 0 | Random position offset |

## Gravity Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `base` | number | 0.000001 | Base gravitational acceleration |
| `ampFrac` | number | 0.4 | Oscillation amplitude fraction |
| `periodFrames` | number | 40 | Oscillation period |
| `oscillateBelowOrbs` | number | 3 | Oscillation threshold |

## Edge Gravity Points

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `strength` | number | 0 | Attraction force |
| `count` | number | 0 | Number of points |
| `insetPixels` | number | 10 | Distance from boundary |

## Edge Guide System

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | boolean | false | Toggle guidance |
| `radiusTargetFrac` | number | 0.6 | Target orbit fraction |
| `bandWidth` | number | 50 | Active zone width |
| `k` | number | 0.01 | Steering strength |
| `minSpeedGate` | number | 3.0 | Minimum speed to apply |

## Collision Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `orbRestitution` | number | 1.008 | Orb-orb energy multiplier |

## Tether Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hitDamping` | number | 0.125 | Speed reduction on break |
| `springRest` | number | 0 | Rest length |
| `springK` | number | 0 | Spring stiffness |
| `springDamping` | number | 0 | Velocity damping |
| `breakSpeedMin` | number | 7.5 | Minimum break speed |
| `immunityFrames` | number | 200 | Protection period |

## Shockwave Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | boolean | true | Toggle shockwaves |
| `lifeFrames` | number | 40 | Duration |
| `maxRadius` | number | 100 | Maximum size |
| `ringThickness` | number | 5 | Visual/collision width |
| `respectProtect` | boolean | true | Honor immunity |
| `cutMode` | string | `"segment"` | Intersection algorithm |
| `triggerOnSplit` | boolean | true | Emit on split |
| `triggerOnImpact` | boolean | true | Emit on collision |
| `impactThreshold` | number | 8.0 | Minimum impact velocity |
| `impactCutsTethers` | boolean | true | Impact shockwaves cut |

## Split Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | boolean | false | Toggle splits |
| `vnThreshold` | number | 10 | Velocity threshold |
| `keThreshold` | number | 100 | Energy threshold |
| `radiusScale` | number | 0.7 | Child radius fraction |
| `childSpeedMul` | number | 0.8 | Child speed multiplier |
| `angleSpread` | number | 0.5 | Separation angle (rad) |
| `maxGenerations` | number | 2 | Maximum split depth |
| `cooldownFrames` | number | 60 | Frames before re-split |
| `maxOrbsCap` | number | 100 | Absolute orb limit |

## Sudden Death Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | boolean | true | Toggle sudden death |
| `afterFrames` | number | 600 | Trigger delay |
| `durationFrames` | number | 360 | Transition period |
| `gravityMultiplier` | number | 16 | Gravity scaling |
| `centerShiftRadius` | number | 100 | Orbit radius |
| `centerShiftPeriodFrames` | number | 150 | Orbit period |
| `orbAttraction` | number | 0.5 | Inter-orb gravity |

## Rendering Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dimUntilBreakSpeed` | boolean | false | Dim slow orbs |
| `orbDimAlpha` | number | 0.5 | Dimmed orb opacity |
| `tetherDimAlpha` | number | 0.3 | Dimmed tether opacity |

## Configuration Summary (v1.2.1)

| Category | Key Settings |
|----------|--------------|
| **Arena** | Circle, 190px radius |
| **Physics** | Super-elastic (1.08/1.008) |
| **Speed** | 4.0-9.5 normal, 25.0 endgame |
| **Spawning** | Rings, stationary, no jitter |
| **Gravity** | Minimal, oscillates below 3 |
| **Tethers** | 200-frame immunity, 7.5 break |
| **Splits** | Disabled |
| **Sudden Death** | 5s trigger, 16x gravity, spiral |
| **Shockwaves** | Enabled, impact triggered |

## Next Steps

- [Engine Overview](/physics/engine-overview) - Architecture overview
- [Fee Distribution](/economics/fee-distribution) - Economic mechanics
- [Constants Reference](/reference/constants) - All system constants
