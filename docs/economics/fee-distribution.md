---
sidebar_position: 1
title: Fee Distribution
description: How entry fees are split between players and protocol (85/15)
---

# Fee Distribution

Entry fees follow a transparent 85/15 split between the prize pool and protocol fees.

## Primary Split

Entry fees are split 85/15 between the player prize pool (vault) and protocol fees.

## Fee Flow

| Destination | Percentage | Purpose |
|-------------|------------|---------|
| **Prize Vault** | 85% | Distributed to players |
| **Protocol Fees** | 15% | Operations & liquidity |

### Protocol Fee Breakdown

The 15% protocol fee is further divided:

| Component | Share | Purpose |
|-----------|-------|---------|
| **LP Vault** | 50% | Accumulates for genesis liquidity |
| **Dev Split** | 50% | Operations |
| **Referral** | 10% of Dev | Referrer rewards |

## Calculation Example

For a 1 SOL entry:
- **Prize Pool**: 0.850 SOL (85%)
- **LP Vault**: 0.015 SOL (1.5%)
- **Dev Wallet**: 0.0135 SOL (1.35%)
- **Referrer**: 0.0015 SOL (0.15%, if applicable)

## Early Exit Fees

EE fees follow the same 80/20 split as entry fees. The EE fee is included in the total payment and split identically.

## Fee Invariants

1. **No protocol retention**: 100% of vault goes to players
2. **Integer arithmetic**: All calculations in lamports (no floating point)
3. **Deterministic**: Same inputs always produce same outputs
4. **Transparent**: All fees visible on-chain

## LP Accumulation

LP vault fees accumulate until genesis pool creation. Once the threshold is reached, the PORB/SOL liquidity pool is created. See [Genesis Bootstrap](/tokenomics/genesis-bootstrap) for liquidity creation details.

## Next Steps

- [Reward Distribution](/economics/payout-mechanics) - Prize distribution
- [Kill Rewards](/economics/kill-rewards) - Bounty system
- [Liquidity Management](/tokenomics/liquidity-management) - LP operations
