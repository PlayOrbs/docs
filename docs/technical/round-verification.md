---
sidebar_position: 5
title: Round Verification
description: How anyone can independently verify any PlayOrbs match result
---

# Round Verification

Every PlayOrbs match can be independently verified by anyone. The verification script replays the entire game from on-chain data and confirms that the winner, placements, kills, and payouts all match.

## How It Works

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ROUND VERIFICATION FLOW                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [1] Fetch Seed           Cryptographic seed from ICP canister     │
│           │                                                          │
│           ▼                                                          │
│   [2] Fetch Roster         Player configs, spawns, join order       │
│           │                                                          │
│           ▼                                                          │
│   [3] Fetch Engine Config  Physics parameters for this version      │
│           │                                                          │
│           ▼                                                          │
│   [4] Replay Simulation    Deterministic physics from frame 0       │
│           │                                                          │
│           ▼                                                          │
│   [5] Compare Results      Winner, placements, kills, payouts       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## What Gets Verified

| Check | Description |
|-------|-------------|
| **Winner** | Simulated winner matches on-chain winner |
| **Placements** | Every player's final rank matches |
| **Kills** | Kill count per player matches |
| **Payouts** | SOL distribution to each player matches exactly |

## Running the Verifier

The verification script is open source. Anyone with `bun` installed can run it:

```bash
# Clone the repo
git clone https://github.com/nicoo/playorbs-verify

# Verify any round
bun verify_round.ts --round 985 --tier 0 --network devnet
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--round <id>` | Round ID to verify | required |
| `--tier <id>` | Tier ID | 0 |
| `--network <net>` | `mainnet` or `devnet` | mainnet |
| `--verbose` | Show detailed simulation output | off |

## Example Output

```
Verifying Round 985 (Tier 0) on devnet

Simulation complete at frame 869

Results:
   On-chain winner:  G7NyEJ...U94E
   Simulated winner: G7NyEJ...U94E

   VERIFIED: Simulation matches on-chain result!

Full Roster Verification:
   Place | On-Chain     | Simulated    | Kills
   1     | G7NyEJ...   | G7NyEJ...   | 4/4
   2     | 7YmGka...   | 7YmGka...   | 0/0
   3     | 5pvMvy...   | 5pvMvy...   | 0/0
   4     | eZGWWV...   | eZGWWV...   | 0/0
   5     | 78qT3X...   | 78qT3X...   | 0/0

   FULL ROSTER VERIFIED: All placements match!

Payout Verification:
   G7NyEJ...  | 0.033575 SOL | 0.033575 SOL | match
   7YmGka...  | 0.006375 SOL | 0.006375 SOL | match
   5pvMvy...  | 0.002550 SOL | 0.002550 SOL | match

   PAYOUTS VERIFIED: All payouts match!
```

## Why This Matters

Traditional competitive games require you to trust the operator. PlayOrbs requires zero trust:

- **Seed is pre-committed** on ICP before the round starts
- **Physics engine is deterministic** — same inputs always produce same outputs
- **All inputs are on-chain** — roster, configs, and seeds are publicly readable
- **Anyone can replay** — no special access or permissions needed

If the operator ever produced a wrong result, anyone in the world could prove it by running the verifier.

## Technical Details

### Data Sources

The verifier fetches everything it needs from two public sources:

| Data | Source | How |
|------|--------|-----|
| Round seed | ICP canister | `get_revealed_seed` query |
| Player roster | ICP canister | `get_round_snapshot` query |
| Player configs | ICP canister | `list_player_configs_if_revealed` query |
| Engine config | ICP canister | `get_engine_config` query |

No Solana RPC is needed — all settlement data is archived on ICP after each round.

### Determinism Guarantee

The simulation engine produces identical results across:
- Different machines (x86, ARM)
- Different runtimes (Node.js, Bun, browser)
- Different operating systems

This is achieved by avoiding floating-point non-determinism and using integer arithmetic for all physics calculations.

### Entry Fee Derivation

The verifier derives the entry fee from on-chain payout totals rather than hardcoding it:

```
entry_fee = total_payouts / (num_players * (1 - dev_fee_bps / 10000))
```

This ensures the verifier works across all tiers without needing Solana RPC access.

## Next Steps

- [Settlement Flow](/technical/settlement-flow) - How settlements work
- [Seed Verification](/randomness/verification) - Cryptographic seed proofs
- [Engine Overview](/physics/engine-overview) - Deterministic physics engine
