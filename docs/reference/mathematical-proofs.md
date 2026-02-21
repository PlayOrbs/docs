---
sidebar_position: 3
title: Mathematical Proofs
description: Economic and probability proofs
---

# Mathematical Proofs

Formal proofs of the economic and probability models underlying PlayOrbs.

## Proof 1: Kill Reward Exact Sum

**Claim**: The sum of all kill rewards equals the bounty pool.

**Given**:
- `bounty_pool`: Total bounty pool
- `N`: Number of players
- `w(A) = 1 + log₂(A)`: Weight function for A alive players
- `W = Σ w(A)` for A from 2 to N: Total weight

**Kill reward formula**:
```
per_kill(A) = floor(bounty_pool × w(A) / W)
```

**Proof**:

1. Without flooring:
   ```
   Σ per_kill(A) = Σ (bounty_pool × w(A) / W)
                 = bounty_pool × Σ w(A) / W
                 = bounty_pool × W / W
                 = bounty_pool
   ```

2. With flooring, let `r(A) = bounty_pool × w(A) / W - floor(bounty_pool × w(A) / W)` be the fractional remainder.

3. Total remainder:
   ```
   R = Σ r(A) where 0 ≤ r(A) < 1
   0 ≤ R < N-1
   ```

4. Since `R` is an integer (difference between integers), `R ∈ {0, 1, ..., N-2}`.

5. Implementation distributes remainder to early kills:
   ```
   for i in 0..R:
       schedule[i] += 1
   ```

6. After adjustment:
   ```
   Σ per_kill(A) = Σ floor(bounty_pool × w(A) / W) + R
                 = bounty_pool - R + R
                 = bounty_pool ∎
   ```

## Proof 2: Emission Decay Convergence

**Claim**: Total emissions converge to a finite sum regardless of rounds played.

**Given**:
- `E₀ = 10`: Initial emission per round
- `d = 0.85`: Decay rate per epoch
- `e = 10`: Rounds per epoch

**Per-round emission at round r**:
```
E(r) = E₀ × d^(floor(r/e))
```

**Total emissions after R rounds**:
```
T(R) = Σ E(r) for r from 0 to R-1
```

**Proof**:

1. Group by epoch n:
   ```
   T(R) = Σ (e × E₀ × d^n) for complete epochs
        + (R mod e) × E₀ × d^(floor(R/e))
   ```

2. For infinite rounds (upper bound):
   ```
   T(∞) = Σ (e × E₀ × d^n) for n from 0 to ∞
        = e × E₀ × Σ d^n
        = e × E₀ × (1 / (1 - d))
        = 10 × 10 × (1 / 0.15)
        = 666.67 PORB per epoch series
   ```

3. Therefore:
   ```
   T(∞) ≤ 666.67 PORB
   ```

4. With per-round probability < 1, actual emissions are lower:
   ```
   Expected(∞) < 666.67 PORB ∎
   ```

**Corollary**: The 100M supply cap will never be reached by emissions alone.

## Proof 3: Fee Distribution Conservation

**Claim**: All entry fees are distributed without loss or gain.

**Given**:
- `total_payment`: Entry amount
- `vault_rate = 0.80`
- `protocol_rate = 0.20`

**Proof**:

1. Primary split:
   ```
   to_vault = floor(total × vault_rate)
   to_fees = total - to_vault
   ```

2. Since `floor(total × 0.80) + (total - floor(total × 0.80)) = total`:
   ```
   to_vault + to_fees = total ✓
   ```

3. Protocol fee split:
   ```
   lp_vault = floor(dev_fee / 2)
   actual_dev = dev_fee - lp_vault
   lp_vault + actual_dev = dev_fee ✓
   ```

4. Referral split:
   ```
   referral = floor(actual_dev × 0.10)
   final_dev = actual_dev - referral
   referral + final_dev = actual_dev ✓
   ```

5. Total conservation:
   ```
   to_vault + lp_vault + final_dev + referral
   = to_vault + dev_fee
   = to_vault + to_fees
   = total ∎
   ```

## Proof 4: Bounty Inheritance Invariant

**Claim**: Bounty inheritance never creates new value.

**Invariant**: `Σ bounty_earned ≤ bounty_pool` for all players at all times.

**Proof by induction**:

1. **Base case** (round start):
   ```
   Σ bounty_earned = 0 ≤ bounty_pool ✓
   ```

2. **Inductive step** (kill at frame f):

   a. Kill payment from schedule:
   ```
   killer.bounty_earned += per_kill(A)
   Σ bounty_earned increases by per_kill(A)
   ```

   b. By Proof 1, `Σ per_kill ≤ bounty_pool`, so:
   ```
   Σ bounty_earned ≤ bounty_pool ✓
   ```

   c. Inheritance transfer:
   ```
   uncashed = victim.bounty_earned - victim.cashed
   killer.bounty_earned += uncashed
   victim.bounty_earned -= uncashed
   ```

   d. Net change in sum:
   ```
   Δ = +uncashed - uncashed = 0
   ```

   e. Therefore:
   ```
   Σ bounty_earned (after) = Σ bounty_earned (before)
   ```

3. Inheritance only moves value, never creates it. ∎

## Proof 5: Hazard Rate Probability

**Claim**: The emission probability function produces values in [0, 1].

**Emission probability formula**:
```
P(emit) = 1 - e^(-λ × activity)
```

Where:
- `λ = 1.0` (hazard rate)
- `activity ≥ 0` (cumulative orb-seconds)

**Proof**:

1. For `activity = 0`:
   ```
   P = 1 - e^(-1 × 0) = 1 - e^0 = 1 - 1 = 0 ✓
   ```

2. For `activity → ∞`:
   ```
   P = 1 - e^(-∞) = 1 - 0 = 1 ✓
   ```

3. For all `activity ≥ 0`:
   ```
   -λ × activity ≤ 0
   e^(-λ × activity) ∈ (0, 1]
   1 - e^(-λ × activity) ∈ [0, 1) ✓
   ```

4. `P` is monotonically increasing in activity:
   ```
   dP/d(activity) = λ × e^(-λ × activity) > 0 ∎
   ```

## Proof 6: Tie-Break Uniqueness

**Claim**: The tie-break rule chain always produces exactly one winner.

**Given**:
- `framesAlive`: Non-negative integer
- `kills`: Non-negative integer
- `rosterIndex`: Unique integer per player

**Proof**:

1. Compare by `framesAlive`:
   - If different → unique maximum exists
   - If tied → proceed to next criterion

2. Compare by `kills`:
   - If different → unique maximum exists
   - If tied → proceed to next criterion

3. Compare by `rosterIndex`:
   - By construction, each player has unique index
   - Therefore, minimum rosterIndex is unique

4. The comparison chain always terminates at step 3 or earlier with exactly one winner. ∎

## Proof 7: Log-Weight Monotonicity

**Claim**: Kill rewards decrease as fewer players remain.

**Weight function**:
```
w(A) = 1 + log₂(A)
```

**Proof**:

1. For `A₁ > A₂`:
   ```
   log₂(A₁) > log₂(A₂)  (log is monotonic)
   1 + log₂(A₁) > 1 + log₂(A₂)
   w(A₁) > w(A₂)
   ```

2. Since `W` is constant and `bounty_pool` is constant:
   ```
   per_kill(A₁) = bounty_pool × w(A₁) / W
   per_kill(A₂) = bounty_pool × w(A₂) / W
   ```

3. Therefore:
   ```
   per_kill(A₁) > per_kill(A₂) when A₁ > A₂ ∎
   ```

## Summary

| Proof | Ensures |
|-------|---------|
| Kill Reward Exact Sum | No bounty lost or created |
| Emission Decay Convergence | Finite token supply |
| Fee Distribution Conservation | All fees accounted for |
| Bounty Inheritance Invariant | No value minting |
| Hazard Rate Probability | Valid probability function |
| Tie-Break Uniqueness | Deterministic winner |
| Log-Weight Monotonicity | Early kills pay more |

## Next Steps

- [Constants Reference](/reference/constants) - System parameters
- [Epoch Decay](/tokenomics/epoch-decay) - Decay algorithm
- [Kill Rewards](/economics/kill-rewards) - Bounty schedule
