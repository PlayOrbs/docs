---
sidebar_position: 2
title: Supply Mechanics
description: Understanding PORB token supply and emissions
---

# Supply Mechanics

The PORB token has a fixed 100M supply cap with controlled emission over time.

## Supply Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PORB TOKEN SUPPLY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   HARD CAP: 100,000,000 PORB                                     │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Genesis Mint                                             │   │
│   │ 500,000 PORB (0.5%)                                      │   │
│   │ → Season 0 point conversions                            │   │
│   │ → Initial CLMM liquidity                                │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Post-Genesis Emissions                                   │   │
│   │ 99,500,000 PORB (99.5%)                                  │   │
│   │ → Probabilistic per-round emissions                     │   │
│   │ → Epoch-based decay (15% per 2-year epoch)             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Genesis Mint Details

At genesis (when LP vault reaches 25 SOL):

| Allocation | Amount | Purpose |
|------------|--------|---------|
| Point Conversions | 250,000 PORB | Season 0 players convert points |
| CLMM Liquidity | 250,000 PORB | Initial trading pool |
| **Total Genesis** | **500,000 PORB** | **0.5% of supply** |

## Post-Genesis Emissions

### Per-Round Distribution
When emission triggers (250 PORB base):

| Recipient | Amount | Percentage |
|-----------|--------|------------|
| 1st Joiner | 100 PORB | 40% |
| 2nd Joiner | 60 PORB | 24% |
| 3rd Joiner | 40 PORB | 16% |
| Season Pool | 50 PORB | 20% |

### Emission Frequency
- Probability increases linearly since last emission
- Guaranteed by round 20
- Average: ~1 emission per 10 rounds

## Supply Cap Enforcement

The protocol enforces the hard cap on-chain:

```rust
// Supply cap in atoms (100M × 10^9)
let cap_atoms = 100_000_000_000_000_000;
let remaining = cap_atoms - root.total_minted_orb;
let actual_mint = min(requested_mint, remaining);

// Track total minted
root.total_minted_orb += actual_mint;
```

No minting possible beyond the cap.

## Emission Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `TOTAL_SUPPLY_CAP` | 100,000,000 PORB | Hard cap |
| `GENESIS_MINT` | 500,000 PORB | Season 0 mint |
| `POST_GENESIS_BUDGET` | 99,500,000 PORB | Remaining for emissions |
| `EMIT_BASE_DEFAULT` | 250 PORB | Per emission event |
| `EMIT_PLAYER_SHARE` | 200 PORB | To first 3 joiners |
| `EMIT_POOL_SHARE` | 50 PORB | To season pool |

## Long-Term Projections

With epoch decay (15% per 2 years):

| Epoch | Years | Rate | Annual | Cumulative |
|-------|-------|------|--------|------------|
| 0 | 0-2 | 250 PORB | ~6.5M | 6.5M |
| 1 | 2-4 | 212 PORB | ~5.5M | 12.0M |
| 2 | 4-6 | 180 PORB | ~4.7M | 16.7M |
| 3 | 6-8 | 153 PORB | ~4.0M | 20.7M |
| 4 | 8-10 | 130 PORB | ~3.4M | 24.1M |
| 10 | 20-22 | 49 PORB | ~1.3M | 37.0M |

Total projected emissions converge to ~43.8M PORB, well under the 99.5M budget.

## Minting Control

All minting requires the mint authority PDA:

```rust
let seeds = &[b"mint_authority", &[bump]];
let signer = &[&seeds[..]];

token::mint_to(
    CpiContext::new_with_signer(token_program, accounts, signer),
    actual_mint
)?;
```

No private key exists—only the program can authorize mints.

## Next Steps

- [Genesis Bootstrap](/tokenomics/genesis-bootstrap) - How genesis triggers
- [Epoch Decay](/tokenomics/epoch-decay) - Decay algorithm details
- [PORB Token](/tokenomics/orb-token) - Token overview
