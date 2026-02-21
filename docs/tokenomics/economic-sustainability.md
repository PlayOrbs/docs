---
sidebar_position: 6
title: Economic Sustainability
description: How the PlayOrbs economy sustains itself long-term
---

# Economic Sustainability

The PlayOrbs economy is designed as a self-sustaining loop where gameplay generates real value.

## The Value Loop

```
┌─────────────────────────────────────────────────────────────────┐
│                    SELF-SUSTAINING ECONOMY                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│         Players                                                  │
│            │                                                     │
│            │ Pay SOL Entry Fees                                  │
│            ▼                                                     │
│      ┌──────────┐                                               │
│      │  Rounds  │                                               │
│      └────┬─────┘                                               │
│           │                                                      │
│           ├───────► 80% → Prize Pool → Winners                  │
│           │                                                      │
│           └───────► 20% → Protocol                              │
│                         │                                        │
│                         ├──► LP Vault                           │
│                         │       │                                │
│                         │       ├──► Buyback (buy PORB)          │
│                         │       │                                │
│                         │       └──► Add Liquidity              │
│                         │                                        │
│                         └──► Dev Wallet → Operations            │
│                                                                  │
│   PORB Token ◄─────────────────────────────────────────────────  │
│       │                                                          │
│       ├──► First 3 Joiners (emissions)                          │
│       │                                                          │
│       └──► Season Pool → Leaderboard Rewards                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Key Economic Properties

| Property | Mechanism |
|----------|-----------|
| **Non-Inflationary** | Hard cap at 100M PORB; emissions stop when exhausted |
| **Liquidity-Backed** | Every PORB backed by real game fees in pool |
| **Deflationary Pressure** | Buybacks add PORB to locked liquidity |
| **Sustainable Emissions** | Epoch decay prevents rapid depletion |
| **Real Yield** | SOL prizes from actual player entry fees |

## Why This Works

### 1. Real Value In
- Players pay SOL to play
- SOL has external market value
- No reliance on token printing

### 2. Real Value Out
- Winners receive SOL prizes
- Not dependent on token price
- Sustainable even at low PORB prices

### 3. Token Value Creation
- Fees fund buybacks
- Buybacks create demand
- Locked liquidity supports price floor

### 4. Long-Term Viability
- Epoch decay extends emissions 100+ years
- Proportional rewards scale with participation
- Self-adjusting based on activity

## Economic Phases

### Early Phase (Years 0-2)
- High emissions attract players
- Community builds rapidly
- Liquidity deepens
- Token distribution spreads

### Growth Phase (Years 2-6)
- Emissions begin decaying
- Buybacks become significant
- Price stability improves
- Utility use cases expand

### Maturity Phase (Years 6+)
- Reduced emissions
- Buyback dominates tokenomics
- Strong liquidity depth
- Pure utility value

### Steady State (Long-term)
- Fixed supply (cap reached or emissions negligible)
- Value from utility only
- Self-sustaining through fees
- No inflation pressure

## Mathematical Foundation

### Emission Convergence
Total emissions converge to ~43.8M PORB (44% of budget):
```
Total = E₀ × N × (1 / (1 - r))
     ≈ 250 × 26,280 × 6.67
     ≈ 43.8M PORB
```

### Fee Sustainability
For every 1 SOL in entry fees:
- 0.8 SOL → Prize pool (players)
- 0.1 SOL → LP vault (liquidity)
- 0.1 SOL → Operations

Liquidity grows proportionally with gameplay volume.

### Buyback Impact
Each buyback:
1. Removes PORB from circulation (into locked LP)
2. Creates buy pressure
3. Adds liquidity depth

## Risk Mitigations

### Player Count Decline
- Smaller pools = smaller prizes
- Natural equilibrium at any scale
- No death spiral mechanics

### Token Price Decline
- SOL prizes unaffected
- Buybacks continue at any price
- Emissions are in PORB, not USD

### Competition
- First-mover liquidity advantage
- Locked LP can't be extracted
- Community-owned tokenomics

## Comparing Models

| Metric | PlayOrbs | Typical P2E |
|--------|-----------|-------------|
| Initial Distribution | 0% pre-mined | 20-50% team/VC |
| Emission Control | Probabilistic + decay | Fixed schedules |
| Liquidity Source | Game fees | External funding |
| Sustainability | Self-funding | Requires growth |
| Trust Model | Locked LP | Team-controlled |

## Next Steps

- [PORB Token](/tokenomics/orb-token) - Token overview
- [Liquidity Management](/tokenomics/liquidity-management) - LP operations
- [Fee Distribution](/economics/fee-distribution) - Fee flow details
