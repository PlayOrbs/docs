---
sidebar_position: 4
title: Settlement Flow
description: How rounds are settled and rewards distributed
---

# Settlement Flow

Settlement is the process of finalizing a round, distributing prizes, and awarding points.

## Settlement Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    SETTLEMENT PIPELINE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [1] Game Ends (off-chain)                                     │
│           │                                                      │
│           ▼                                                      │
│   [2] Generate Seed (ICP Canister)                              │
│           │                                                      │
│           ▼                                                      │
│   [3] Determine Winners (off-chain logic)                       │
│           │                                                      │
│           ▼                                                      │
│   [4] Call settleRound (seed + signature)                       │
│           │                                                      │
│           ▼                                                      │
│   [5] Call roundPayout (distribute SOL)                         │
│           │                                                      │
│           ▼                                                      │
│   [6] Call updatePlayerStats (award points)                     │
│           │                                                      │
│           ▼                                                      │
│   [7] Call closeRoundPlayers (reclaim rent)                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Next Steps

- [Security Model](/technical/security-model) - Access control
- [Randomness Verification](/randomness/verification) - Seed verification
