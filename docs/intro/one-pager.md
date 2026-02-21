---
sidebar_position: 0
title: One Pager
description: PlayOrbs at a glance
---

# PlayOrbs

```
    ██████╗ ██╗      █████╗ ██╗   ██╗ ██████╗ ██████╗ ██████╗ ███████╗
    ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝
    ██████╔╝██║     ███████║ ╚████╔╝ ██║   ██║██████╔╝██████╔╝███████╗
    ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║   ██║██╔══██╗██╔══██╗╚════██║
    ██║     ███████╗██║  ██║   ██║   ╚██████╔╝██║  ██║██████╔╝███████║
    ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝
```

**The provably fair battle royale powered by [Solana](https://solana.com) & [ICP](https://internetcomputer.org).**

---

## The Problem

Web3 gaming is broken. Players face:

- **Rigged outcomes** — Centralized RNG that operators can manipulate
- **Ponzi tokenomics** — Inflationary tokens backed by nothing but hope
- **Rug-prone liquidity** — Team-controlled pools that vanish overnight
- **Pay-to-win mechanics** — Deep pockets beat skill every time

---

## The Solution

PlayOrbs reimagines competitive gaming with trustless infrastructure.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│      PAY SOL  ───►  COMPETE  ───►  WIN SOL                            │
│         │              │              │                                │
│         │              │              └── Real competition. Real rewards.│
│         │              │                                               │
│         │              └── Physics-based battle royale                 │
│         │                  Deterministic. Verifiable.                  │
│         │                                                              │
│         └── No tokens required to play                                 │
│             Entry fees fund prize pools                                │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## How It Works

| Step | Action | Result |
|:----:|--------|--------|
| **1** | Pay SOL entry fee | Join the arena |
| **2** | Battle royale begins | Physics engine determines winner |
| **3** | ICP provides seed | Cryptographically verified outcome |
| **4** | Winners paid instantly | SOL + Points + PORB tokens |

**Zero trust required.** Every outcome is verifiable on-chain.

---

## The PORB Token

**100% fair launch. Zero pre-mine. Zero VC allocation.**

```
         ┌─────────────────────────────────────────┐
         │         PORB TOKENOMICS                 │
         ├─────────────────────────────────────────┤
         │                                         │
         │   Total Supply:     100,000,000 PORB    │
         │   Team Allocation:  0%                  │
         │   VC Allocation:    0%                  │
         │   Treasury:         0%                  │
         │   Gameplay:         100%                │
         │                                         │
         │   ████████████████████████████  100%    │
         │   ▲                                     │
         │   └── Every token earned through play   │
         │                                         │
         └─────────────────────────────────────────┘
```

### Liquidity-Backed Value

Every PORB is backed by real game fees:

- **20%** of all entry fees flow to protocol
- **50%** of protocol fees fund LP vault
- **Continuous buybacks** create demand
- **Locked liquidity** — permanently. No rug possible.

---

## Why PlayOrbs Wins

| Traditional Gaming | PlayOrbs |
|--------------------|----------|
| Trust the operator | Trust the math |
| Inflationary tokens | Hard cap at 100M |
| Team controls liquidity | Liquidity locked forever |
| Opaque RNG | ICP threshold cryptography |
| Play to grind | Play to compete |

---

## The Numbers

```
┌──────────────────┬──────────────────┬──────────────────┐
│   PRIZE SPLIT    │   FEE SPLIT      │   EMISSIONS      │
├──────────────────┼──────────────────┼──────────────────┤
│                  │                  │                  │
│   80% → Players  │   80% → Prizes   │   Decay: 15%/    │
│                  │                  │          epoch   │
│   ┌──────────┐   │   20% → Protocol │                  │
│   │ 70%      │   │       │          │   Longevity:     │
│   │ Bounty   │   │       ├─► LP     │   100+ years     │
│   │ (kills)  │   │       │          │                  │
│   ├──────────┤   │       └─► Dev    │   Fair: First 3  │
│   │ 30%      │   │                  │   joiners earn   │
│   │ Survival │   │                  │                  │
│   └──────────┘   │                  │                  │
│                  │                  │                  │
└──────────────────┴──────────────────┴──────────────────┘
```

---

## Dual-Chain Architecture

PlayOrbs leverages two blockchains, each doing what it does best:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │            INTERNET COMPUTER (ICP)                               │   │
│   │            internetcomputer.org                                  │   │
│   │                                                                  │   │
│   │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │   │
│   │   │  Threshold  │   │   Merkle    │   │   ECDSA     │           │   │
│   │   │  Randomness │──►│   Trees     │──►│  Signatures │           │   │
│   │   └─────────────┘   └─────────────┘   └─────────────┘           │   │
│   │                                                                  │   │
│   │   WHY ICP: Decentralized RNG that no one can predict or rig    │   │
│   └──────────────────────────────┬──────────────────────────────────┘   │
│                                  │                                      │
│                                  ▼ Cryptographic Proofs                 │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │            SOLANA                                                │   │
│   │            solana.com                                            │   │
│   │                                                                  │   │
│   │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │   │
│   │   │   Verify    │   │   Execute   │   │   Reward    │           │   │
│   │   │   Proofs    │──►│   Rounds    │──►│   Winners   │           │   │
│   │   └─────────────┘   └─────────────┘   └─────────────┘           │   │
│   │                                                                  │   │
│   │   WHY SOLANA: Fast, cheap transactions with locked liquidity    │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Get Started

```
1. Connect Solana wallet
2. Choose your tier
3. Join a round
4. Compete and earn
```

**No tokens needed. Just SOL and skill.**

---

## Links

| Resource | Description |
|----------|-------------|
| [How It Works](/intro/how-it-works) | Detailed game flow |
| [PORB Token](/tokenomics/orb-token) | Token mechanics |
| [Randomness](/randomness/overview) | Cryptographic fairness |
| [Getting Started](/gameplay/getting-started) | Start playing |

---

## Built On

| Chain | Role | Link |
|-------|------|------|
| **Solana** | Execution, settlements, liquidity | [solana.com](https://solana.com) |
| **Internet Computer** | Provably fair randomness | [internetcomputer.org](https://internetcomputer.org) |

---

<div style={{textAlign: 'center', marginTop: '2rem'}}>

**PlayOrbs** — Where every collision counts.

*Executed on [Solana](https://solana.com). Secured by [ICP](https://internetcomputer.org). Owned by players.*

</div>
