---
sidebar_position: 5
title: Liquidity Management
description: How the protocol manages CLMM liquidity and buybacks
---

# Liquidity Management

The protocol uses Raydium's Concentrated Liquidity Market Maker (CLMM) for efficient liquidity.

## CLMM Integration

| Parameter | Value |
|-----------|-------|
| **Pool Type** | Raydium CLMM |
| **Token Pair** | PORB / WSOL |
| **Initial Price** | 0.0001 SOL/PORB |
| **Price Range** | -30% to +∞ |
| **Slippage Tolerance** | 500 bps (5%) |

## Liquidity Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    LIQUIDITY ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐                    ┌─────────────────────┐    │
│   │   LP Vault  │◄──── Game Fees ────│    Game Rounds      │    │
│   │   (WSOL)    │                    │                     │    │
│   └──────┬──────┘                    └─────────────────────┘    │
│          │                                                       │
│          │                                                       │
│          ▼                                                       │
│   ┌──────────────────────────────────────────────────────┐      │
│   │                  Raydium CLMM Pool                    │      │
│   │                   PORB / WSOL                          │      │
│   │                                                       │      │
│   │  ┌─────────────────────────────────────────────┐     │      │
│   │  │  Concentrated Liquidity Position            │     │      │
│   │  │  Range: -30% to ∞                          │     │      │
│   │  │  Position NFT: LOCKED                       │     │      │
│   │  └─────────────────────────────────────────────┘     │      │
│   │                                                       │      │
│   └──────────────────────────────────────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Fee Accumulation

Protocol fees flow to the LP vault:

```
Player Entry Fee
    │
    ├── 80% → Prize Pool
    │
    └── 20% → Protocol
            │
            ├── 50% → LP Vault ← Accumulates here
            │
            └── 50% → Dev Wallet
```

## Buyback Mechanism

When the LP vault accumulates sufficient SOL:

```
┌─────────────────────────────────────────────────────────────────┐
│ BUYBACK OPERATION                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [1] Threshold Check                                            │
│       └── LP vault balance >= minimum                           │
│                                                                  │
│   [2] Execute Buyback                                            │
│       └── Swap 50% of vault: WSOL → PORB                         │
│       └── Via CLMM swap                                          │
│                                                                  │
│   [3] Add Liquidity                                              │
│       └── Remaining 50% WSOL + bought PORB                       │
│       └── Increases pool depth                                   │
│                                                                  │
│   [4] Repeat                                                     │
│       └── Process continues as fees accumulate                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Buyback Algorithm

```rust
fn execute_buyback(lp_vault_balance: u64) -> Result<()> {
    // Calculate buyback amount (50%)
    let buyback_amount = lp_vault_balance / 2;

    // Validate minimum
    require!(buyback_amount > MIN_THRESHOLD);

    // Execute swap via CLMM
    let swap_instruction = build_swap_instruction(
        input: buyback_amount,  // WSOL
        output: PORB,
        slippage: 500,  // 5% max
    );

    invoke_signed(swap_instruction, vault_authority_seeds)?;

    // Remaining 50% for liquidity increase
    Ok(())
}
```

## Position Locking

The CLMM position NFT is **permanently locked**:

```rust
// Position lock via Raydium Lock
lock_position(position_nft)?;
```

Benefits:
- Cannot be withdrawn
- Guarantees permanent liquidity
- Prevents rug pulls
- Builds long-term trust

## Buyback Benefits

### Continuous Buy Pressure
- Regular WSOL → PORB swaps
- Creates demand for PORB
- Supports token price

### Deepening Liquidity
- More liquidity = lower slippage
- Better trading experience
- More stable prices

### Self-Reinforcing Loop
- More players → more fees
- More fees → more buybacks
- More buybacks → more liquidity
- More liquidity → better UX
- Better UX → more players

## Liquidity Operations

### Initial Liquidity (Genesis)
```
open_position()
├── 250,000 PORB
├── 25 SOL
├── Price: 0.0001 SOL/PORB
└── Range: -30% to +∞
```

### Ongoing Operations
```
increase_liquidity()
├── Accumulated WSOL from fees
├── PORB from buybacks
└── Adds to existing position
```

## Next Steps

- [Economic Sustainability](/tokenomics/economic-sustainability) - The full value loop
- [Fee Distribution](/economics/fee-distribution) - How fees flow
- [Genesis Bootstrap](/tokenomics/genesis-bootstrap) - Initial setup
