---
sidebar_position: 5
title: Tether System
description: Protective lines connecting orbs to anchors
---

# Tether System

Tethers are protective lines connecting orbs to boundary anchor points. Breaking all of a player's tethers eliminates them.

## Configuration Parameters

| Parameter | Description | Effect |
|-----------|-------------|--------|
| **hitDamping** | Speed reduction when breaking | Higher = more slowdown |
| **springRest** | Rest length for elastic tethers | 0 = point attachment |
| **springK** | Spring stiffness | Higher = tighter response |
| **springDamping** | Velocity damping on spring | Prevents oscillation |
| **breakSpeedMin** | Minimum speed to break tethers | Protects slow orbs |
| **immunityFrames** | Protection period after creation | Prevents instant break |

## Current Configuration

```
Hit Damping:         0.125 (12.5% speed reduction)
Spring:              Disabled (K=0)
Break Speed Minimum: 7.5
Immunity:            200 frames (~1.67 seconds)
```

## Tether Mechanics

### Creation
Each orb spawns with tethers connecting to anchor points on the boundary:
```
Orb spawns → Tethers created → Immunity timer starts
```

### Immunity Period
New tethers can't be broken for `immunityFrames`:
```rust
fn can_break_tether(tether: &Tether, current_frame: usize) -> bool {
    current_frame > tether.created_frame + immunity_frames
}
```

### Breaking Conditions
A tether breaks when:
1. Immunity has expired
2. Colliding orb speed ≥ `breakSpeedMin`
3. Orb intersects the tether line

## Breaking Effects

When a tether breaks:

### 1. Speed Reduction
```rust
orb.velocity *= (1.0 - hit_damping);
// Example: 1.0 - 0.125 = 0.875 → 87.5% speed retained
```

### 2. Kill Credit
The breaking orb's owner gets credit for the kill (when all tethers broken).


## Elimination

When all of a player's tethers are broken:
```
All tethers broken → Player eliminated → Kill credited → Orb removed
```

## Shockwave Interaction

Shockwaves can cut tethers based on configuration:

| Parameter | Description |
|-----------|-------------|
| **respectProtect** | Honor immunity period |
| **cutMode** | `anchor` or `segment` intersection |
| **impactCutsTethers** | Allow impact shockwaves to cut |


## Next Steps

- [Sudden Death](/physics/sudden-death) - Endgame acceleration
- [Parameter Reference](/physics/parameter-reference) - All parameters
- [Collision Physics](/physics/collision-physics) - Impact mechanics
