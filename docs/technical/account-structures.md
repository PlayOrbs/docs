---
sidebar_position: 2
title: Account Structures
description: On-chain account layouts and PDA derivations
---

# Account Structures

The program maintains state across multiple Program Derived Addresses (PDAs).

## Account Summary

| Account | PDA Seeds | Size | Purpose |
|---------|-----------|------|---------|
| `RootAccount` | `["root"]` | ~560 bytes | Global configuration & state |
| `RoundPage` | `["round_page", tier_id, page_index]` | ~23.5 KB | Paged round storage |
| `RoundPlayer` | `["rp", tier_id, round_id, player]` | 86 bytes | Membership proof |
| `PlayerStats` | `["ps", season_id, player]` | 129 bytes | Per-season statistics |
| `Vault` | `["vault", tier_id, round_id]` | ~165 bytes | Prize pool escrow |
| `SeasonSnapshot` | `["season_snapshot", season_id]` | 59 bytes | Frozen season data |

## RootAccount

Global configuration and state for the entire program.

```rust
struct RootAccount {
    // Authority
    authority: Pubkey,
    dev_wallet: Pubkey,
    orb_mint: Pubkey,

    // Season tracking
    season_id: u64,
    season_rounds_total: u64,
    season_rounds_played: u64,
    current_season_total_points: u128,
    season_pool_orb: u128,

    // Genesis state
    genesis_done: bool,
    conversion_open: bool,
    lp_accum_sol: u64,
    genesis_threshold_lamports: u64,
    genesis_orb_cap: u64,
    orbs_minted_from_conversion: u64,
    points_per_orb_effective: u64,

    // Emission state
    total_minted_orb: u128,
    emission_budget_cap: u128,
    total_rounds_since_genesis: u64,
    last_emission_round: u64,
    epoch_index: u32,
    epoch_rounds: u64,
    decay_bps: u16,
    hazard_cap_rounds: u64,
    emit_base: u128,

    // Tier configuration
    tier_configs: Vec<TierConfig>,
    tier_states: Vec<TierState>,

    // Fee configuration
    dev_fee_bps: u16,
}
```

**PDA Derivation**: `["root"]`

## RoundPage

Paged storage for round metadata. Each page holds 120 rounds.

```rust
struct RoundPage {
    tier_id: u8,
    page_index: u32,
    rounds: [RoundMeta; 120],  // zero-copy
}
```

**PDA Derivation**: `["round_page", tier_id.to_le_bytes(), page_index.to_le_bytes()]`

### RoundMeta

Individual round data within a page:

```rust
#[repr(C, packed)]
struct RoundMeta {
    id: u64,                    // Unique identifier
    season_id: u16,             // Season this round belongs to
    tier_id: u8,                // Associated tier
    status: u8,                 // 0=Open, 1=Countdown, 2=Settled
    countdown_start_ts: i64,    // Unix timestamp
    entry_lamports: u64,        // Entry fee
    min_players: u16,           // Minimum players
    max_players: u16,           // Maximum capacity
    countdown_secs: u32,        // Duration
    seed_hex: [u8; 32],         // Cryptographic seed
    seed_hex_present: u8,       // Flag: 1 if seed set
    joined_count: u16,          // Current players
    created_ts: i64,            // Creation timestamp
    did_emit: u8,               // Emission flag
}
// Size: 195 bytes per round
```

## RoundPlayer

Membership proof that a player joined a specific round.

```rust
struct RoundPlayer {
    tier_id: u8,
    round_id: u64,
    player: Pubkey,
    payout_processed: bool,
    stats_applied: bool,
    account_index: u16,         // Join order
    referrer: Option<Pubkey>,
}
```

**PDA Derivation**: `["rp", tier_id.to_le_bytes(), round_id.to_le_bytes(), player]`

## PlayerStats

Per-season statistics for a player.

```rust
struct PlayerStats {
    season_id: u64,
    player: Pubkey,
    season_points: u64,
    total_points: u64,
    rounds_played: u32,
    wins: u32,
    kills: u32,
    sol_earned_lamports: u64,
    orb_earned_atoms: u64,
    season_pool_claimed: bool,
}
```

**PDA Derivation**: `["ps", season_id.to_le_bytes(), player]`

## Vault

Prize pool escrow for a specific round.

```rust
struct Vault {
    tier_id: u8,
    round_id: u64,
    balance: u64,
}
```

**PDA Derivation**: `["vault", tier_id.to_le_bytes(), round_id.to_le_bytes()]`

## SeasonSnapshot

Frozen state at season end for claiming.

```rust
struct SeasonSnapshot {
    season_id: u64,
    total_points: u128,
    pool_orb_atoms: u128,
    orbs_claimed: u128,
    finalized: bool,
}
```

**PDA Derivation**: `["season_snapshot", season_id.to_le_bytes()]`

## TierConfig

Configuration for a competition tier:

```rust
struct TierConfig {
    tier_id: u8,
    entry_lamports: u64,
    min_players: u16,
    max_players: u16,
    countdown_secs: u32,
    take_profit: u64,
    points_multiplier: u16,
}
```

## TierState

Runtime state for a tier:

```rust
struct TierState {
    tier_id: u8,
    last_settled_round_id: u64,
    current_page_index: u32,
}
```

## Storage Optimization

### Paged Rounds
Rounds are stored in pages to manage Solana's account size limits:
```
Page Index = floor(round_id / 120)
Slot Index = round_id % 120
```

### PDA-Based Membership
Instead of storing rosters on-chain, membership is proven via RoundPlayer PDAs:
- Reduces transaction size
- Enables efficient RPC filtering via `memcmp`
- No array size limits

## Next Steps

- [Instruction Reference](/technical/instruction-reference) - Program instructions
- [Settlement Flow](/technical/settlement-flow) - How settlement works
- [Security Model](/technical/security-model) - Security mechanisms
