---
sidebar_position: 4
title: Collision Physics
description: Orb-orb collision detection and resolution
---

# Collision Physics

Orbs collide elastically, transferring momentum and potentially triggering eliminations.

## Collision Detection

Two orbs collide when their centers are closer than the sum of their radii:

```rust
fn check_collision(orb_a: &Orb, orb_b: &Orb) -> bool {
    let distance = (orb_a.position - orb_b.position).length();
    let min_distance = orb_a.radius + orb_b.radius;

    distance < min_distance
}
```

## Collision Resolution

When orbs collide, velocities are exchanged along the collision axis:

```rust
fn resolve_collision(orb_a: &mut Orb, orb_b: &mut Orb, restitution: f32) {
    // Collision normal
    let normal = (orb_b.position - orb_a.position).normalize();

    // Relative velocity along normal
    let relative_velocity = orb_a.velocity - orb_b.velocity;
    let velocity_along_normal = relative_velocity.dot(normal);

    // Only resolve if approaching
    if velocity_along_normal > 0.0 {
        return;
    }

    // Calculate impulse (equal mass assumed)
    let impulse = -velocity_along_normal * restitution;

    // Apply impulse
    orb_a.velocity += normal * impulse;
    orb_b.velocity -= normal * impulse;

    // Separate overlapping orbs
    separate_orbs(orb_a, orb_b);
}
```

## Configuration

| Parameter | Description | Current Value |
|-----------|-------------|---------------|
| **orbRestitution** | Energy transfer coefficient | 1.004 |

### Restitution Effects

| Value | Effect |
|-------|--------|
| < 1.0 | Energy lost (dampening) |
| = 1.0 | Energy preserved |
| > 1.0 | Energy added (accelerating) |

Current config (1.004) adds very slight energy, creating gradually faster gameplay.

## Collision Events

Collisions can trigger:

### Tether Breaking
If an orb is moving fast enough and hits a tether, the tether breaks.

### Shockwaves
High-impact collisions emit shockwaves that can cut nearby tethers.

### Eliminations
When all of a player's tethers are broken, they're eliminated.


## Orb Properties

| Property | Value | Description |
|----------|-------|-------------|
| **radius** | 12px | Collision hitbox |
| **baseSpeed** | 2.0 | Initial velocity |
| **colors** | 6 | Visual distinction |


## Next Steps

- [Tether System](/physics/tether-system) - Protective connections
- [Sudden Death](/physics/sudden-death) - Endgame mechanics
- [Parameter Reference](/physics/parameter-reference) - All parameters
