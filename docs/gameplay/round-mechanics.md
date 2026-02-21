---
sidebar_position: 2
title: Round Mechanics
description: How rounds progress from open to settled
---

# Round Mechanics

Every PlayOrbs round follows a predictable lifecycle with three distinct states.

## Round State Machine

```
┌──────────────────────────────────────────────────────────────────┐
│                      ROUND STATES                                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│   [OPEN]  ───────►  [COUNTDOWN]  ───────►  [SETTLED]             │
│     │                    │                      │                │
│  Players              Timer                  Winners              │
│   Join              Counting               Determined             │
│                        Down                                       │
│                                                                   │
│  Trigger: First      Trigger:             Trigger:               │
│  player joins      Min players          Countdown ends           │
│                      reached              OR max players          │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## State Details

### Open State

The round begins when the first player joins:

| Property | Description |
|----------|-------------|
| **Trigger** | First player joins tier |
| **Actions** | Accept new players, accumulate prize pool |
| **Duration** | Until minimum players reached |
| **Fee Split** | 80% to vault, 20% to protocol |

During this phase:
- Players can join freely
- Prize pool grows with each entry
- No time pressure

### Countdown State

Triggered when minimum player threshold is met:

| Property | Description |
|----------|-------------|
| **Trigger** | `joined_count >= min_players` |
| **Duration** | Tier-specific (30-120 seconds typical) |
| **Actions** | Continue accepting joins, timer runs |

During this phase:
- Countdown timer visible to all
- New players can still join
- Prize pool continues growing
- Ends when timer expires OR max players reached

### Settled State

The terminal state after competition:

| Property | Description |
|----------|-------------|
| **Trigger** | Countdown expires OR max players |
| **Actions** | Set seed, distribute prizes, award points |
| **Terminal** | No further state changes |

During settlement:
1. Cryptographic seed is set
2. Game outcome is determined
3. SOL prizes distributed to winners
4. Points awarded to all participants
5. PORB emissions processed (if triggered)

## Round Data Structure

Each round tracks:

```
RoundMeta {
    id: u64,                    // Unique identifier
    season_id: u16,             // Season this round belongs to
    tier_id: u8,                // Associated tier
    status: u8,                 // 0=Open, 1=Countdown, 2=Settled
    countdown_start_ts: i64,    // Unix timestamp
    entry_lamports: u64,        // Entry fee
    min_players: u16,           // Minimum to start
    max_players: u16,           // Maximum capacity
    countdown_secs: u32,        // Duration
    seed_hex: [u8; 32],         // Cryptographic seed
    joined_count: u16,          // Current players
    created_ts: i64,            // Creation time
}
```

## Settlement Eligibility

A round can be settled when:

```
settlement_allowed = (status == COUNTDOWN) AND (
    (now >= countdown_start_ts + countdown_secs)  // Timeout
    OR (joined_count == max_players)              // Full
)
```

## Next Steps

- [Tier System](/gameplay/tier-system) - Tier configurations
- [Settlement Flow](/technical/settlement-flow) - Technical settlement details
- [Randomness](/randomness/overview) - How seeds are generated
