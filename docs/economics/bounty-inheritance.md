---
sidebar_position: 4
title: Bounty Inheritance
description: Kill chaining and bounty transfer mechanics
---

# Bounty Inheritance

Bounty inheritance transfers a victim's uncashed earnings to their killer, enabling kill chains and strategic depth.

## Core Concept

When Player A kills Player B, B's uncashed bounty transfers to A. This increases A's total bounty and may immediately trigger their EE target.

## How It Works

The inheritance amount equals the victim's earned bounty minus any they've already cashed out. This amount is transferred to the killer.

## Example Scenario

If Player A (0.5 SOL earned) kills Player B (0.8 SOL earned from 3 kills), Player A receives:
- Kill bounty from the schedule (e.g., 0.4 SOL)
- B's uncashed bounty (0.8 SOL)
- Total: 1.7 SOL earned

## Kill Chain Effect

Inheritance creates kill chains where eliminating high-earners is valuable. A player who eliminates someone with accumulated bounty gains all of it, making late-game kills on successful players very rewarding.

## Frame Processing Order

Each frame processes events in order: elimination detection, kill bounty payment, inheritance transfer, EE target checks, and finalization. The order is critical: inheritance happens before EE checks.

## Inheritance + Early Exit

Inheritance can instantly trigger EE. If a player with a 1.0 SOL EE target and 0.6 SOL current earnings kills someone with 0.5 SOL uncashed, the kill bounty plus inheritance may push them over the target, triggering immediate exit.

## Invariants

1. **No minting**: Transfers only move existing credits
2. **Sum preservation**: Total bounty earned never exceeds pool
3. **Idempotent**: Each kill processes exactly once
4. **Deterministic**: Same game state produces same inheritance

## Strategic Implications

### Target Selection
- **High-earner targets**: Large inheritance potential but often skilled and dangerous
- **Fresh targets**: Easier kills but low inheritance value

### EE Timing
- **Early EE**: Secure earnings with no risk of losing to inheritance, but miss survival pool
- **Late EE**: Higher potential from inheritance chains but risk losing everything

## Next Steps

- [Kill Rewards](/economics/kill-rewards) - Base bounty schedule
- [Tie Breaking](/economics/tie-breaking) - Finalization rules
- [Early Exit](/gameplay/take-profit) - EE mechanics
