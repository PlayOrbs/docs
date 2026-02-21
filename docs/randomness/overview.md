---
sidebar_position: 1
title: Randomness Overview
description: Why decentralized randomness matters for fair gaming
---

# Randomness Overview

Fair randomness is essential for trustless gaming. PlayOrbs uses cryptographic verification to ensure outcomes are unpredictable and verifiable.

## The Problem

Decentralized games face a fundamental challenge: how to generate randomness that is both unpredictable and verifiable.

### Traditional Approaches and Their Flaws

| Approach | Problem |
|----------|---------|
| **On-chain block hashes** | Can be manipulated by validators |
| **Centralized RNG** | Requires trusting an operator |
| **Commit-reveal schemes** | Adds latency and complexity |
| **VRF oracles** | External trust assumptions |

### What Players Need

For competitive gaming with real prizes, players need assurance that:
1. No one can predict outcomes before they occur
2. No one can manipulate outcomes after the fact
3. Anyone can verify that randomness was generated fairly

## The [ICP](https://internetcomputer.org) Solution

PlayOrbs uses the [Internet Computer Protocol's](https://internetcomputer.org) threshold cryptography to create a randomness system with three key properties:

### 1. Cryptographic Unpredictability
Seeds are derived from ICP's distributed randomness, which requires collusion of a supermajority of subnet nodes to predict.

### 2. Public Verifiability
Every seed comes with a Merkle proof and ECDSA signature that anyone can verify.

### 3. Temporal Binding
Seeds are cryptographically bound to specific game rounds and cannot be reused or substituted.

## How It Works

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEED VERIFICATION ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     ICP CANISTER (Off-Chain)                         │   │
│   │                                                                      │   │
│   │   1. Generate 50 random seeds per chunk                             │   │
│   │   2. Build Merkle tree from leaf hashes                             │   │
│   │   3. Sign chunk root with ECDSA                                     │   │
│   │   4. Store for on-demand reveal                                     │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     SOLANA PROGRAM (On-Chain)                        │   │
│   │                                                                      │   │
│   │   1. Verify ECDSA signature on chunk root                           │   │
│   │   2. Compute leaf hash with round_id binding                        │   │
│   │   3. Verify Merkle proof from leaf to root                          │   │
│   │   4. Store verified seed in round state                             │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Trust Model

The system's security rests on:

| Assumption | Description |
|------------|-------------|
| **[ICP](https://internetcomputer.org) Network Security** | Supermajority of subnet nodes must be honest |
| **Cryptographic Hardness** | SHA-256 and ECDSA remain secure |
| **Canister Integrity** | Deployed code matches audited source |

**Notably, administrators are not trusted** for seed generation. Even with full admin access, operators cannot predict or manipulate seeds because:
- Randomness comes from distributed threshold operations
- Seeds are committed via signatures before revelation
- The master seed is never stored

## Key Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Chunk Size | 50 seeds | Balance signing overhead and memory |
| Seed Size | 32 bytes | Standard cryptographic entropy |
| Hash Function | SHA-256 | Industry standard, hardware accelerated |
| Signature Curve | secp256k1 | Cross-chain compatibility |

## Next Steps

- [ICP Integration](/randomness/icp-integration) - How ICP canisters work
- [Seed Generation](/randomness/seed-generation) - Seed derivation process
- [Verification](/randomness/verification) - Proof verification
