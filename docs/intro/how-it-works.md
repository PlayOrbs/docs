---
sidebar_position: 2
title: How It Works
description: Understanding the PlayOrbs flow from entry to rewards
---

# How It Works

The game operates as a simple loop: enter, compete, and earn rewards based on your performance.

## Game Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           GAME FLOW                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   [1. ENTRY]        [2. COMPETE]       [3. SETTLE]      [4. REWARDS]    │
│       │                  │                  │                │          │
│       ▼                  ▼                  ▼                ▼          │
│   Pay SOL  ──────►  Battle Royale  ──►  Random Seed  ──►  SOL Prize    │
│   Entry Fee        (Off-chain game)    (ICP verified)    + Points       │
│                                                           + PORB         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## The Game Loop

### 1. Entry
Players pay SOL to join a round in their chosen tier. Each tier has different:
- Entry fees (higher tiers = bigger rewards)
- Player limits
- Countdown durations
- Points multipliers

### 2. Competition
Battle royale gameplay happens off-chain in a deterministic physics engine:
- All players spawn in the arena
- Orbs collide, break tethers, and eliminate opponents
- Last orb standing wins

### 3. Settlement
After the round ends:
- A cryptographic seed from the ICP canister determines final outcomes
- Winners are verified on-chain
- Prizes are distributed automatically

### 4. Rewards
Participants earn multiple reward types:
- **SOL Prizes**: Winners receive portions of the prize pool
- **Points**: All players earn points based on performance
- **PORB Tokens**: First 3 joiners may receive token emissions

## Fee Distribution

When you pay an entry fee, it's split automatically:

```
Entry Fee (100%)
    │
    ├── 80% → Prize Pool (winners)
    │
    └── 20% → Protocol
            │
            ├── 50% → LP Vault (liquidity)
            │
            └── 50% → Dev Wallet
                    │
                    ├── 90% → Development
                    │
                    └── 10% → Referral Rewards
```

## Round States

Every round progresses through three states:

| State | Description | What Happens |
|-------|-------------|--------------|
| **Open** | Accepting players | Players join, prize pool grows |
| **Countdown** | Timer running | Minimum players reached, countdown starts |
| **Settled** | Round complete | Winners determined, prizes distributed |

## Settlement Verification

The settlement process ensures fairness:

1. **ICP Canister** generates a cryptographic seed
2. **Merkle Proof** binds the seed to the specific round
3. **ECDSA Signature** proves authenticity
4. **On-chain Verification** confirms everything before settlement

This means no one—not even the operators—can predict or manipulate outcomes.

## Next Steps

- [Key Features](/intro/key-features) - Explore unique game mechanics
- [Round Mechanics](/gameplay/round-mechanics) - Deep dive into round states
- [Randomness System](/randomness/overview) - How fairness is guaranteed
