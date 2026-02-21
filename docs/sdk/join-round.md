---
sidebar_position: 1
title: Join Round
description: SDK documentation for joining game rounds
---

# Join Round

The `@playorbs/sdk` provides a simple API to join game rounds programmatically.

## Installation

```bash
npm install @playorbs/sdk
# or
yarn add @playorbs/sdk
```

### Peer Dependencies

```bash
npm install @coral-xyz/anchor @solana/web3.js bn.js
```

## Quick Start

```typescript
import { OrbsGameSDK } from "@playorbs/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";

// Create connection
const connection = new Connection("https://api.mainnet-beta.solana.com");

// Create provider
const wallet = new Wallet(Keypair.generate());
const provider = new AnchorProvider(connection, wallet, {
  commitment: "confirmed",
});

// Initialize SDK
const sdk = new OrbsGameSDK({ provider });
```

## API Reference

### `joinRound(options: JoinRoundOptions)`

Join a game round by paying the entry fee.

```typescript
interface JoinRoundOptions {
  roundId: number;           // Round ID to join
  tierId: number;            // Tier ID (0, 1, 2, etc.)
  player: Keypair | WalletSigner;  // Player keypair or wallet
  tpPreset?: number;         // Take Profit preset (0-4)
  referrer?: PublicKey;      // Optional referrer
}
```

**Take Profit Presets:**
| Value | Name | Description |
|-------|------|-------------|
| 0 | Disabled | No automatic exit |
| 1 | Safe | Conservative exit threshold |
| 2 | Balanced | Moderate exit threshold |
| 3 | Fierce | Aggressive exit threshold |
| 4 | YOLO | Maximum risk threshold |

**Returns:**
```typescript
{ signature: string }  // Transaction signature
```

### `getNextRoundId(tierId: number)`

Get the next available round ID for a tier.

```typescript
const nextRound = await sdk.getNextRoundId(0);
```

## Join Bot Example

Here's a complete example of a bot that automatically joins rounds:

```typescript
import { OrbsGameSDK } from "@playorbs/sdk";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import bs58 from "bs58";

// Configuration
const RPC_URL = "https://api.mainnet-beta.solana.com";
const TIER_ID = 0; // Which tier to join
const TP_PRESET = 2; // Balanced take profit
const CHECK_INTERVAL_MS = 5000; // Check every 5 seconds

async function main() {
  // Load keypair from environment or file
  const secretKey = bs58.decode(process.env.PRIVATE_KEY!);
  const playerKeypair = Keypair.fromSecretKey(secretKey);

  // Setup connection and SDK
  const connection = new Connection(RPC_URL, "confirmed");
  const provider = new AnchorProvider(
    connection,
    new Wallet(playerKeypair),
    { commitment: "confirmed" }
  );
  const sdk = new OrbsGameSDK({ provider });

  console.log(`Bot started for wallet: ${playerKeypair.publicKey.toBase58()}`);

  // Main loop
  while (true) {
    try {
      // Check wallet balance
      const balance = await connection.getBalance(playerKeypair.publicKey);
      console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

      if (balance < 0.05 * LAMPORTS_PER_SOL) {
        console.log("Low balance, waiting...");
        await sleep(CHECK_INTERVAL_MS);
        continue;
      }

      // Get next available round
      const roundId = await sdk.getNextRoundId(TIER_ID);
      console.log(`Next round: ${roundId}`);

      // Check if already in this round
      const roundPlayer = await sdk.fetch.roundPlayer(
        TIER_ID,
        roundId,
        playerKeypair.publicKey
      );

      if (roundPlayer) {
        console.log(`Already in round ${roundId}, waiting...`);
        await sleep(CHECK_INTERVAL_MS);
        continue;
      }

      // Join the round
      console.log(`Joining round ${roundId}...`);
      const { signature } = await sdk.joinRound({
        roundId,
        tierId: TIER_ID,
        player: playerKeypair,
        tpPreset: TP_PRESET,
      });

      console.log(`Joined round ${roundId}! TX: ${signature}`);

      // Wait before checking again
      await sleep(CHECK_INTERVAL_MS);
    } catch (error) {
      console.error("Error:", error);
      await sleep(CHECK_INTERVAL_MS);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch(console.error);
```

### Running the Bot

1. Create a `.env` file:
```
PRIVATE_KEY=your_base58_private_key
```

2. Run the bot:
```bash
npx ts-node bot.ts
```

### Running Indefinitely

#### Option 1: PM2 (Recommended)

[PM2](https://pm2.keymetrics.io/) is a production process manager that keeps your bot running forever.

```bash
# Install PM2 globally
npm install -g pm2

# Start the bot
pm2 start bot.ts --interpreter ts-node --name "playorbs-bot"

# View logs
pm2 logs playorbs-bot

# Monitor
pm2 monit

# Auto-restart on server reboot
pm2 startup
pm2 save
```

**PM2 ecosystem file** (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: "playorbs-bot",
    script: "bot.ts",
    interpreter: "ts-node",
    env: {
      PRIVATE_KEY: "your_base58_private_key",
    },
    restart_delay: 5000,
    max_restarts: 10,
  }]
};
```

Then run:
```bash
pm2 start ecosystem.config.js
```

#### Option 2: Screen/Tmux

For quick deployments on a VPS:

```bash
# Using screen
screen -S playorbs-bot
npx ts-node bot.ts
# Detach with Ctrl+A, D
# Reattach with: screen -r playorbs-bot

# Using tmux
tmux new -s playorbs-bot
npx ts-node bot.ts
# Detach with Ctrl+B, D
# Reattach with: tmux attach -t playorbs-bot
```

#### Option 3: Systemd (Linux)

Create `/etc/systemd/system/playorbs-bot.service`:

```ini
[Unit]
Description=PlayOrbs Join Bot
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/bot
ExecStart=/usr/bin/npx ts-node bot.ts
Restart=always
RestartSec=5
Environment=PRIVATE_KEY=your_base58_private_key

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable playorbs-bot
sudo systemctl start playorbs-bot

# Check status
sudo systemctl status playorbs-bot

# View logs
journalctl -u playorbs-bot -f
```

## Browser Wallet Support

For browser-based applications using wallet adapters:

```typescript
import { useWallet } from "@solana/wallet-adapter-react";

function JoinRoundButton({ roundId, tierId }: { roundId: number; tierId: number }) {
  const wallet = useWallet();

  const handleJoin = async () => {
    const { signature } = await sdk.joinRound({
      roundId,
      tierId,
      player: {
        publicKey: wallet.publicKey!,
        signTransaction: wallet.signTransaction!,
      },
    });
    console.log("Joined:", signature);
  };

  return <button onClick={handleJoin}>Join Round</button>;
}
```

## Error Handling

Common errors when joining rounds:

| Error | Cause |
|-------|-------|
| `RoundNotOpen` | Round is full or already settled |
| `AlreadyJoined` | Player already in this round |
| `InsufficientFunds` | Not enough SOL for entry fee |

```typescript
try {
  await sdk.joinRound({ roundId, tierId, player });
} catch (error) {
  if (error.message.includes("RoundNotOpen")) {
    // Try next round
    const nextRound = await sdk.getNextRoundId(tierId);
  }
}
```
