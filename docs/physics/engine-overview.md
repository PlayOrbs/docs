---
sidebar_position: 1
title: Engine Overview
description: Deterministic physics engine running at 120Hz
---

# Engine Overview

The Orbs Battle Game runs on a fully deterministic physics engine at 120 Hz, enabling trustless verification and replay.

## Core Principles

| Principle | Description |
|-----------|-------------|
| **Fixed Timestep** | 120 frames per second physics simulation |
| **Determinism** | Identical outcomes from identical seeds across any platform |
| **Modularity** | Configurable parameters without code changes |
| **Blockchain-Ready** | Cryptographic hashing of configurations and states |

## Simulation Pipeline

Each frame executes a multi-phase update cycle including position updates, collision detection, gravity application, tether mechanics, and economic scoring.

## Determinism Guarantees

The engine ensures byte-identical results across any platform:
- Cryptographic seeding from ICP canister
- Deterministic math with lookup tables
- Integer arithmetic for economic calculations

Every game can be replayed from its seed for trustless verification and dispute resolution.

## Current Configuration

| Category | Settings |
|----------|----------|
| **Arena** | Circle, 190px radius |
| **Physics** | Slightly super-elastic (1.08 wall, 1.008 orb-orb) |
| **Speed** | 4.0-9.5 normal, up to 25.0 endgame |
| **Spawning** | Ring-based, stationary start |
| **Gravity** | Minimal base, oscillates below 3 orbs |
| **Tethers** | 200-frame immunity, 7.5 break speed minimum |
| **Splits** | Disabled |
| **Sudden Death** | At 5 seconds, 16x gravity, spiral center |
| **Shockwaves** | Enabled, triggered by impacts and splits |

## Next Steps

- [Boundary System](/physics/boundary-system) - Arena and walls
- [Gravity System](/physics/gravity-system) - Central and oscillating gravity
- [Collision Physics](/physics/collision-physics) - Orb interactions
