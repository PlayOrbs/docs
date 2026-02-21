---
sidebar_position: 1
title: Glossary
description: Terminology and definitions
---

# Glossary

Comprehensive reference of terms used throughout the PlayOrbs documentation.

## Game Terms

### Orb
A player's in-game representation. Each player controls one orb that moves and collides within the arena.

### Tether
Protective line connecting an orb to an anchor point on the arena boundary. Breaking all tethers eliminates a player.

### Round
A single game session from open to settlement. Players join, compete, and one winner is determined.

### Tier
A competition level with specific entry fee, player limits, and scoring multiplier. Higher tiers offer larger rewards.

### Season
A time-bounded competition period for accumulating points and competing on leaderboards.

### Arena
The circular boundary where gameplay occurs. Default is a 190-pixel radius circle.

## Economic Terms

### Bounty Pool
70% of the prize pool, distributed via kill rewards.

### Survival Pool
30% of the prize pool, awarded to the last player standing.

### Kill Reward
SOL payment received for eliminating another player. Follows a log-weighted schedule.

### Early Exit (EE)
Mechanism allowing players to claim accumulated rewards and exit the round before elimination.

### Bounty Inheritance
Transfer of a victim's uncashed bounty to their killer upon elimination.

### Lamports
Smallest unit of SOL. 1 SOL = 1,000,000,000 lamports.

## Token Terms

### PORB Token
The native token of the PlayOrbs ecosystem. Earned through gameplay, used for governance.

### Emission
The process of minting new PORB tokens as rewards for gameplay.

### Epoch
A 10-round period defining emission decay cycles. Each epoch reduces emissions by 15%.

### Genesis Pool
The initial PORB/SOL liquidity pool created from accumulated LP fees.

### CLMM
Concentrated Liquidity Market Maker. Raydium's DEX model used for PORB trading.

## Technical Terms

### PDA
Program Derived Address. Deterministic account addresses used by Solana programs.

### Anchor
Solana's framework for writing secure smart contracts (programs).

### Settlement
The process of finalizing a round with seed verification and reward distribution.

### Seed
Cryptographic randomness used to determine game outcomes deterministically.

### Merkle Proof
Cryptographic proof verifying seed inclusion in a pre-committed tree.

### ICP
Internet Computer Protocol. Provides decentralized randomness generation.

### Canister
A smart contract on the Internet Computer, used for seed generation.

## Physics Terms

### Restitution
Energy multiplier applied during collisions. Values greater than 1.0 add energy, less than 1.0 loses energy.

### Gravity
Central force pulling orbs toward the arena center. Oscillates in endgame.

### Shockwave
Expanding ring emitted from collisions/eliminations that can cut nearby tethers.

### Sudden Death
Endgame phase with increased gravity to force confrontation.

### Immunity Frames
Protection period after tether creation during which it cannot be broken.

## Scoring Terms

### Points
Non-transferable score accumulated within a season for leaderboard ranking.

### Placement Points
Points awarded based on finishing position (1st: 500, 2nd: 350, 3rd: 250).

### Kill Points
Points awarded per elimination (100 per kill).

### Participation Points
Base points for completing a round (50 points).

### Points Multiplier
Tier-specific scaling factor for points earned.

## State Machine Terms

### Open
Round state accepting player joins.

### Countdown
Round state where timer runs before settlement.

### Settled
Terminal round state after verification and reward distribution.

### Frame
Single physics simulation step. The engine runs at 120 frames per second.

## Account Types

### RootAccount
Global configuration and state storage.

### RoundPage
Paged storage for round data (120 rounds per page).

### RoundPlayer
Membership proof for a player in a specific round.

### PlayerStats
Per-season statistics for a player.

### Vault
Prize pool escrow for a specific round.

### SeasonSnapshot
Frozen season data for historical reference.

## Abbreviations

| Abbrev | Full Term |
|--------|-----------|
| SOL | Solana token |
| PORB | PlayOrbs token |
| EE | Early Exit |
| LP | Liquidity Provider |
| PDA | Program Derived Address |
| ICP | Internet Computer Protocol |
| CLMM | Concentrated Liquidity Market Maker |
| BPS | Basis Points (1/100 of 1%) |
| TX | Transaction |
| RPC | Remote Procedure Call |

## Next Steps

- [Constants Reference](/reference/constants) - All system parameters
- [Mathematical Proofs](/reference/mathematical-proofs) - Economic proofs
