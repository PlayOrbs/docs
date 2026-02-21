---
sidebar_position: 4
title: Early Exit
description: Early exit mechanics for securing rewards
---

# Early Exit (EE)

Early Exit is an optional mechanism that lets players exit early when they've earned enough.

## How It Works

1. **Set a Target**: When joining, specify a target earnings amount
2. **Play Normally**: Compete and earn bounty from kills
3. **Auto-Exit**: If your earnings hit the target, you automatically claim and exit
4. **Orb Removed**: Your orb is removed from the arena

## When EE Triggers

EE is checked after each frame's kill rewards. When your total earnings reach or exceed your target, you automatically claim your rewards and your orbs are removed from the arena.

## Benefits and Trade-offs

### Benefits
- **Lock in earnings**: Secure rewards before elimination
- **Risk management**: Limit downside on higher tiers
- **Strategic play**: Exit after a big kill streak

### Trade-offs
- **Miss winner bonus**: Can't win the survival pool
- **Reduced maximum**: Cap your potential upside
- **Early exit**: No chance for more kills

## EE Presets

Common preset strategies:

| Preset | Target | Strategy |
|--------|--------|----------|
| Safe | ~2 kills value | Minimize risk |
| Balanced | ~4 kills value | Moderate approach |
| Aggressive | ~6 kills value | High upside |
| YOLO | No EE | Maximum risk/reward |

## Edge Cases

### EE vs Kill (Same Frame)
- Kill resolves **first**
- EE cannot "save" you from death
- If killed before EE triggers, you don't claim

### Multiple EE Same Frame
- Allowed
- All qualifying players exit
- Finalization happens after pruning

### Final Survivor
- When only 1 player remains, EE is **skipped**
- Winner receives survival pool + remaining bounty instead

### EE and Splits
- EE applies per **owner**, not per orb
- All of a player's orbs are pruned on EE

## Example Scenario

```
Round with 10 players, 1 SOL entry each:
- Player pool: 8 SOL (80% of 10 SOL)
- Bounty pool: 5.6 SOL (70% of 8 SOL)

Player A sets EE target: 0.5 SOL
Player A gets 2 early kills: earns 0.6 SOL
→ EE triggers
→ Player A exits with 0.6 SOL secured
→ Player A's orbs removed from arena
```

## Frame Processing Order

The game processes events in strict order:

1. Elimination attribution → distribute kill bounty
2. Inheritance (if enabled)
3. EE checks → emit triggers
4. Prune EE'd orbs
5. Finalize if alive ≤ 1

## Next Steps

- [Kill Rewards](/economics/kill-rewards) - How kill rewards work
- [Reward Distribution](/economics/payout-mechanics) - Full reward structure
- [Seasons](/gameplay/seasons) - Long-term progression
