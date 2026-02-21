---
sidebar_position: 2
title: PORB Emissions
description: How PORB tokens are distributed per round
---

# PORB Emissions

After Genesis, rounds can trigger PORB token emissions to early joiners and the season pool.

## Emission Distribution

When an emission triggers (250 PORB total):

| Recipient | Amount | Share |
|-----------|--------|-------|
| 1st Joiner | 100 PORB | 40% |
| 2nd Joiner | 60 PORB | 24% |
| 3rd Joiner | 40 PORB | 16% |
| Season Pool | 50 PORB | 20% |

**Strategic implication**: Being first to join rounds increases PORB earnings.

## Emission Probability

Not every round triggers an emission. The probability increases linearly with rounds since the last emission:

**Key points:**
- Probability increases by 5% per round since last emission
- At round 20: Guaranteed emission (100%)
- Average: ~1 emission per 10 rounds

## How It Works

The emission decision uses verifiable randomness based on the round seed. The probability is deterministic and can be verified by anyone.

## Epoch Decay

Emissions decrease over time to ensure long-term sustainability:

| Epoch | Years | Emission Rate | ~Annual |
|-------|-------|---------------|---------|
| 0 | 0-2 | 250 PORB | ~6.5M PORB |
| 1 | 2-4 | 212 PORB | ~5.5M PORB |
| 2 | 4-6 | 180 PORB | ~4.7M PORB |
| 3 | 6-8 | 153 PORB | ~4.0M PORB |
| 4 | 8-10 | 130 PORB | ~3.4M PORB |

Each epoch is approximately 2 years. The emission rate decays by 15% per epoch.

## Supply Cap

Emissions are hard-capped:
- Total supply: 100,000,000 PORB
- Genesis mint: 500,000 PORB
- Post-genesis budget: 99,500,000 PORB

When the budget is exhausted, emissions stop permanently.

## Maximizing Emissions

To maximize PORB earnings:

1. **Join early**: First 3 joiners get emissions
2. **Join often**: More rounds = more opportunities
3. **Watch the gap**: After long gaps, emissions are more likely
4. **Track epoch**: Early epochs have higher emission rates

## Next Steps

- [Epoch Decay](/tokenomics/epoch-decay) - Detailed decay mechanics
- [Supply Mechanics](/tokenomics/supply-mechanics) - Token supply structure
- [Leaderboards](/earning/leaderboards) - Season rankings
