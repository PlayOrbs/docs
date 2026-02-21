---
sidebar_position: 3
title: Instruction Reference
description: Complete reference for all program instructions
---

# Instruction Reference

The PlayOrbs program exposes 18 instructions for managing rounds, settlements, and token operations.

## Instruction Summary

| Instruction | Description | Access |
|-------------|-------------|--------|
| `initialize_root` | One-time program setup | Authority |
| `join_round` | Player enters round | Any player |
| `settle_round` | Set seed, trigger emissions | Authority |
| `round_payout` | Distribute SOL prizes | Authority |
| `update_player_stats` | Award points | Authority |
| `close_round_player` | Reclaim rent | Authority |
| `check_and_run_genesis` | Trigger genesis | Authority |
| `convert_points` | Season 0 points → PORB | Player |
| `claim_season_pool` | Claim season rewards | Player |
| `init_referral` | Set referrer | Player |
| `claim_referral_rewards` | Claim SOL rewards | Player |
| `set_nickname` | Set unique nickname | Player |
| `open_position` | Create CLMM position | Authority |
| `increase_liquidity` | Add to CLMM | Authority |
| `lock_position` | Lock position NFT | Authority |
| `buyback` | WSOL → PORB swap | Authority |

## Player Instructions

### join_round

Player enters a round by paying the entry fee.

```rust
pub fn join_round(
    ctx: Context<JoinRound>,
    tier_id: u8,
    round_id: u64,
) -> Result<()>
```

**Accounts:**
- `player`: Signer (payer)
- `root`: RootAccount
- `round_page`: RoundPage for this tier
- `round_player`: RoundPlayer PDA (created)
- `vault`: Vault for this round
- `referrer`: Optional referrer account

**Effects:**
- Creates RoundPlayer PDA
- Transfers entry fee to vault and protocol
- Increments round player count
- May trigger countdown

### convert_points

Convert Season 0 points to PORB tokens (post-genesis only).

```rust
pub fn convert_points(
    ctx: Context<ConvertPoints>,
) -> Result<()>
```

**Accounts:**
- `player`: Signer
- `root`: RootAccount
- `player_stats`: PlayerStats for season 0
- `orb_mint`: PORB token mint
- `player_ata`: Player's PORB token account

**Effects:**
- Calculates PORB amount from points
- Mints PORB to player
- Zeros player's season points

### claim_season_pool

Claim proportional share of season pool.

```rust
pub fn claim_season_pool(
    ctx: Context<ClaimSeasonPool>,
    season_id: u64,
) -> Result<()>
```

**Accounts:**
- `player`: Signer
- `player_stats`: PlayerStats for the season
- `season_snapshot`: SeasonSnapshot
- `orb_mint`: PORB token mint
- `player_ata`: Player's PORB token account

**Effects:**
- Calculates proportional share
- Mints PORB to player
- Marks player as claimed

### init_referral

Set the referrer for a player (one-time).

```rust
pub fn init_referral(
    ctx: Context<InitReferral>,
    referrer: Pubkey,
) -> Result<()>
```

### claim_referral_rewards

Claim accumulated referral SOL rewards.

```rust
pub fn claim_referral_rewards(
    ctx: Context<ClaimReferralRewards>,
) -> Result<()>
```

### set_nickname

Set a unique player nickname.

```rust
pub fn set_nickname(
    ctx: Context<SetNickname>,
    nickname: String,
) -> Result<()>
```

## Authority Instructions

### initialize_root

One-time program initialization.

```rust
pub fn initialize_root(
    ctx: Context<InitializeRoot>,
    config: RootConfig,
) -> Result<()>
```

### settle_round

Settle a round with cryptographic seed.

```rust
pub fn settle_round(
    ctx: Context<SettleRound>,
    tier_id: u8,
    round_id: u64,
    seed_hex: [u8; 32],
    seed_verification: Option<SeedVerificationArgs>,
) -> Result<()>
```

**Effects:**
- Sets round seed
- Triggers emission probability check
- Distributes emissions if triggered
- Updates round status to Settled

### round_payout

Distribute SOL prizes to winners.

```rust
pub fn round_payout(
    ctx: Context<RoundPayout>,
    tier_id: u8,
    round_id: u64,
    payouts: Vec<PayoutEntry>,
) -> Result<()>
```

**PayoutEntry:**
```rust
struct PayoutEntry {
    player: Pubkey,
    account_index: u16,
    payout: u64,  // lamports
}
```

### update_player_stats

Award points to players after settlement.

```rust
pub fn update_player_stats(
    ctx: Context<UpdatePlayerStats>,
    tier_id: u8,
    round_id: u64,
    stats: Vec<StatsEntry>,
) -> Result<()>
```

**StatsEntry:**
```rust
struct StatsEntry {
    player: Pubkey,
    account_index: u16,
    prize: u64,
    placement: u8,
    kills: u16,
}
```

### close_round_player

Reclaim rent from processed RoundPlayer accounts.

```rust
pub fn close_round_player(
    ctx: Context<CloseRoundPlayer>,
    tier_id: u8,
    round_id: u64,
    player: Pubkey,
) -> Result<()>
```

**Requirements:**
- `payout_processed == true`
- `stats_applied == true`

### check_and_run_genesis

Trigger genesis when threshold is met.

```rust
pub fn check_and_run_genesis(
    ctx: Context<CheckAndRunGenesis>,
) -> Result<()>
```

**Requirements:**
- `genesis_done == false`
- `lp_accum_sol >= genesis_threshold_lamports`

## Liquidity Instructions

### open_position

Create initial CLMM position at genesis.

```rust
pub fn open_position(
    ctx: Context<OpenPosition>,
    lower_tick: i32,
    upper_tick: i32,
) -> Result<()>
```

### increase_liquidity

Add liquidity to existing position.

```rust
pub fn increase_liquidity(
    ctx: Context<IncreaseLiquidity>,
    amount_sol: u64,
    amount_orb: u64,
) -> Result<()>
```

### lock_position

Permanently lock the position NFT.

```rust
pub fn lock_position(
    ctx: Context<LockPosition>,
) -> Result<()>
```

### buyback

Execute WSOL → PORB swap via CLMM.

```rust
pub fn buyback(
    ctx: Context<Buyback>,
    amount: u64,
    min_output: u64,
) -> Result<()>
```

## Next Steps

- [Settlement Flow](/technical/settlement-flow) - Settlement process details
- [Security Model](/technical/security-model) - Access control and security
