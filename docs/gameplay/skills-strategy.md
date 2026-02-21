---
sidebar_position: 6
title: Skills & Strategy
description: Understanding skill multipliers and strategic tradeoffs
---

# Skills & Strategy

PlayOrbs features a skill system that allows players to influence gameplay outcomes through strategic stat allocation. Skills are earned through the [Matrix Game](/gameplay/matrix-game) and applied via deterministic physics calculations.

## Skill Point System

Before each round, you play the **Matrix Game** to earn Skill Points (SP):

1. **Memorize** — Watch tiles reveal one-by-one, some contain SP
2. **Hunt** — Click to find SP tiles from memory
3. **Allocate** — Distribute earned SP across three skills

Maximum SP per skill: **4 points**

### Multiplier Conversion

Skill points convert to multipliers using a **diminishing returns** curve:

```
multiplier = 1 + 0.5 * (1 - e^(-0.5 * points))
```

| Points | Multiplier | Effective Bonus |
|--------|------------|-----------------|
| 0 | 1.00x | +0% |
| 1 | 1.11x | +11% |
| 2 | 1.18x | +18% |
| 3 | 1.22x | +22% |
| 4 | 1.24x | +24% |

This curve means:
- First point gives the biggest boost (+11%)
- Additional points have smaller incremental gains
- Spreading points across skills is often better than maxing one

## The Three Skills

### Tether Defense

**Effect**: Raises the speed threshold enemies need to break YOUR tethers. Defensive only — does not affect your ability to break enemy tethers.

When an opponent's orb collides with your tether, the physics engine checks if they are moving fast enough to break it. Higher Tether Defense raises this threshold:

```
effectiveBreakSpeed = baseBreakSpeed * tetherDefMul
```

| Multiplier | Break Speed Required (for enemies) |
|------------|------------------------------------|
| 1.00x | 100% of base |
| 1.11x | 111% of base |
| 1.18x | 118% of base |
| 1.24x | 124% of base |

**Strategic value**: Defensive survivability. Harder-to-break tethers mean you stay alive longer, earning more survival rewards.

### Power (Orb Speed)

**Effect**: Increases your orb's maximum velocity cap.

The physics engine enforces a speed limit on all orbs. Higher Power raises this cap:

```
effectiveMaxSpeed = baseMaxSpeed * powerMul
```

| Multiplier | Max Speed |
|------------|-----------|
| 1.00x | 5.0 (base) |
| 1.11x | 5.55 |
| 1.18x | 5.90 |
| 1.24x | 6.20 |

**Strategic value**: Faster movement creates more opportunities for collisions, harder-to-dodge attacks, and quicker positioning.

### Split Aggression

**Effect**: Lowers your own split thresholds, making your orb more likely to split on high-impact collisions.

```
effectiveThreshold = baseThreshold / sqrt(splitAggroMul)
```

**Tradeoff**: When your orb splits, child orbs receive a **reduced Tether Defense** multiplier:

```
childTetherDef = parentTetherDef * 0.9  (floored at 0.7x of parent)
```

| Points | Split Threshold | Child Tether Penalty |
|--------|-----------------|---------------------|
| 0 | 100% | None (no splits) |
| 2 | 92% | Children at 90% parent tether defense |
| 4 | 87% | Children at 90% parent tether defense |

**Strategic value**: High-variance playstyle. More orbs provide battlefield presence and tactical flexibility, but each child orb is individually more vulnerable.

## Allocation Strategies

### Balanced Build (1-2 / 1-2 / 1-2)

Spread points across all skills for flexibility:
- Moderate tether defense
- Reasonable speed
- Occasional splits

Best for: Adapting to different opponents and situations.

### Defensive Survivor (0 / 3-4 / 1-2)

Focus on Tether Defense with some Power:
- Maximum tether survivability
- Good chase speed
- No split bonus

Best for: Staying alive longer, earning survival rewards.

### Swarm Tactics (3-4 / 1 / 0)

Maximize Split Aggression:
- Many orbs on the field
- Numerical advantage
- Weaker individual orbs

Best for: Overwhelming opponents, controlling space.

### Speed Demon (0 / 1-2 / 3-4)

Focus on Power:
- Maximum velocity
- Hard to escape
- Standard tether breaking

Best for: Aggressive pressure, quick repositioning.

### Conservative (0 / 0 / 0)

Skip the Matrix or allocate nothing:
- All skills at baseline 1.0x
- No advantages, no weaknesses

Best for: When Matrix performance was poor, or preferring pure physics.

## Strategic Considerations

No single skill configuration guarantees victory. Effectiveness depends on:

| Factor | Consideration |
|--------|---------------|
| **Player count** | More players may favor defensive/survival builds |
| **Tier level** | Higher tiers may warrant conservative approaches |
| **Playstyle** | Aggressive vs. survival-focused play |
| **Opponents** | Counter-building based on expected strategies |

### Skill Interactions

| Your Build | Strong Against | Weak Against |
|------------|----------------|--------------|
| High Tether Def | Low-power attackers | High-power orbs that exceed threshold |
| High Power | Evasive players, high-defense tethers | Swarm tactics |
| High Split Aggro | Single-orb players | AoE shockwaves, weakened tether defense |

## Technical Implementation

### Physics Application Points

Skills are applied at specific moments in the physics calculation:

1. **Tether Defense**: When checking if enemy orb velocity exceeds break threshold (applied to tether owner)
2. **Power**: When clamping orb velocity to maximum speed cap (applied twice per frame)
3. **Split Aggression**: When evaluating collision energy against split thresholds

### Inheritance on Split

When an orb splits:
- **Power** and **Split Aggression** pass to children unchanged
- **Tether Defense** receives a penalty: `child = max(parent * 0.9, parent * 0.7)`

### Determinism

All skill effects are computed deterministically:

1. **No hidden factors**: Multipliers apply via explicit mathematical formulas
2. **Reproducible outcomes**: Same inputs always produce same results
3. **Cross-platform consistency**: Uses deterministic math functions

## Balance Validation

The skill system was validated through Monte Carlo simulation:

- Thousands of simulated rounds with varied configurations
- Chi-square statistical analysis for fairness
- No configuration provides dominant advantage in isolation
- Effectiveness depends on full context of each round

## Next Steps

- [Matrix Game](/gameplay/matrix-game) — How to earn skill points
- [Round Mechanics](/gameplay/round-mechanics) — How rounds play out
- [Early Exit](/gameplay/take-profit) — Securing your earnings
