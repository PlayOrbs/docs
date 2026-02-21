---
sidebar_position: 1
title: Fee Distribution
description: How entry fees are split between players and protocol
---

# Fee Distribution

Entry fees follow a transparent 80/20 split between the prize pool and protocol fees.

## Primary Split

Entry fees are split 80/20 between the player prize pool (vault) and protocol fees.

## Fee Flow

| Destination | Percentage | Purpose |
|-------------|------------|---------|
| **Prize Vault** | 80% | Distributed to winners |
| **Protocol Fees** | 20% | Operations & liquidity |

### Protocol Fee Breakdown

The 20% protocol fee is further divided:

| Component | Share | Purpose |
|-----------|-------|---------|
| **LP Vault** | 50% | Accumulates for genesis liquidity |
| **Dev Split** | 50% | Operations |
| **Referral** | 10% of Dev | Referrer rewards |

## Calculation Example

For a 1 SOL entry:
- **Prize Pool**: 0.800 SOL (80%)
- **LP Vault**: 0.020 SOL (2%)
- **Dev Wallet**: 0.018 SOL (1.8%)
- **Referrer**: 0.002 SOL (0.2%, if applicable)

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
