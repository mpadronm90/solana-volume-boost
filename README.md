# Solana Volume Boost Bot

## Overview

This project is a Solana bot that interacts with the blockchain for volume boosting, arbitrage, or liquidity operations.

**⚠️ Always review and understand the code before running it with real funds.**

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- Yarn or npm

---

## Setup

### 1. Clone the Repository

```sh
git clone <repo-url>
cd <repo-directory>
```

### 2. Install Dependencies

```sh
npm install
# or
yarn install
```

### 3. Create Keypair Files

Generate keypairs for the payer and block engine (if needed):

```sh
solana-keygen new -o payer.json
solana-keygen new -o blockengine.json
```

- `payer.json`: Used to sign and pay for transactions (required by `src/clients/config.ts`).
- `blockengine.json`: Used for Jito block engine authentication (required if using Jito features).

> **Best Practice:** Use separate keypairs for each purpose. Never use your main wallet.

### 4. Set Up Environment Variables

Create a `.env` file in the project root:

```env
# Bot identity
BOT_NAME=my-bot
NUM_WORKER_THREADS=4

# Solana RPC and Block Engine
BLOCK_ENGINE_URLS=frankfurt.mainnet.block-engine.jito.wtf
AUTH_KEYPAIR_PATH=./blockengine.json
RPC_URL=https://api.mainnet-beta.solana.com
RPC_REQUESTS_PER_SECOND=0
RPC_MAX_BATCH_SIZE=20

# Geyser (streaming) settings
GEYSER_URL=mainnet.rpc.jito.wtf
GEYSER_ACCESS_TOKEN=00000000-0000-0000-0000-000000000000

# Arbitrage calculation
ARB_CALCULATION_NUM_STEPS=3
MAX_ARB_CALCULATION_TIME_MS=15

# Wallets
PAYER_KEYPAIR_PATH=./payer.json

# Tipping and Fees
MIN_TIP_LAMPORTS=10000
TIP_PERCENT=50

# Pool and Fee Addresses (replace with your own if desired)
RAY_FEE=YourFeeAddressHere
TIP_ACCT=YourTipAddressHere
RAY_LIQ_POOL_V4=YourPoolAddressHere

# Private key for root config.ts (base58-encoded)
SOL_SENDER_PRIV_KEY=your_base58_private_key
```

**Security Note:**
- Never share your private key or commit it to version control.
- Use a dedicated wallet for bots, not your main wallet.

---

## Configuration Notes

- **`payer.json`** and **`blockengine.json`** are required if referenced in your config.
- **`SOL_SENDER_PRIV_KEY`** is required if used in your root `config.ts`.
- **Fee and tip addresses:**  
  By default, these may send a portion of your funds to the original author.  
  **Replace them with your own addresses if you want to keep all funds.**
- **Pool address:**  
  Set `RAY_LIQ_POOL_V4` to your own pool (e.g., from Pump.fun) if needed.

---

## Finding Your Market ID (Raydium/Serum)

**The Market ID is NOT your token mint, LP token, or pool address.**
It is the unique address of the Raydium/Serum orderbook for your trading pair.

### How to Find Your Market ID

#### If your pool was created on pump.fun:
1. Go to your token's page on pump.fun.
2. Look for a section labeled "Raydium Pool", "Market", or "Trade on Raydium".
3. There may be a link to Solscan or Raydium—open it.
4. On Solscan, look for a field called "Market" or "Market ID" (44-character Solana address).
5. Copy this address and use it as the Market ID in the bot.

#### On Raydium or Solscan:
1. Go to [Solscan Raydium Pools](https://solscan.io/raydium/pools) or [Raydium Swap](https://raydium.io/swap/).
2. Search for your token or trading pair.
3. Click on your pool, and look for a field called "Market" or "Market ID".
4. Copy that address—this is what you enter as the Market ID in the bot.

#### What NOT to use:
- Not the LP token mint address
- Not the pool address
- Not your token's mint address

If you are unsure, paste your token address into Solscan and look for a "Markets" section. If you don't see one, your market may not be live yet.

---

## Jito Block Engine Registration Required

**IMPORTANT:**
- Your `blockengine.json` keypair must be registered and active with Jito to use the block engine features.
- Go to [Jito Searcher Portal](https://searcher.jito.network/) and register the public key from your `blockengine.json`.
- Wait for approval/activation from Jito. If your key is not registered, you will get a `PERMISSION_DENIED` error.
- You can extract your public key from `blockengine.json` using a script:

```js
import { Keypair } from '@solana/web3.js';
import fs from 'fs';
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('blockengine.json', 'utf8')));
const keypair = Keypair.fromSecretKey(secretKey);
console.log(keypair.publicKey.toBase58());
```

---

## Running the Bot

Check your `package.json` for the correct start script. Common options:

```sh
npm start
# or
yarn start
# or
npx ts-node main.ts
```

You may also run specific scripts, such as:

```sh
npx ts-node src/bot.ts
npx ts-node src/distribute.ts
```

---

## How Tipping Works

- **Every time you run a main function (like swaps or distribution), a tip is sent to `TIP_ACCT`.**
- **The amount is always set by user input at runtime.**
- **The tip is sent from your main wallet (`wallet.publicKey`).**
- **To avoid tipping the default address, set `TIP_ACCT` in your `.env` to your own address.**

---

## Security Warnings

- **Never use a wallet with significant funds for testing.**
- **Review all addresses in your configuration.**
- **Understand the business logic before running.**
- **If you do not want to tip, enter `0` when prompted, or set `TIP_ACCT` to your own address.**

---

## Troubleshooting

- **Missing module errors:**  
  Install dependencies with `npm install` or `yarn install`.
- **Missing keypair file:**  
  Generate with `solana-keygen new -o <filename>.json`.
- **Environment variable errors:**  
  Double-check your `.env` file and variable names.
- **Jito PERMISSION_DENIED error:**  
  Make sure your blockengine keypair is registered and active in Jito.
- **No mint data / Market ID errors:**  
  Double-check you are using the correct Market ID (see above).

---

## Contributing

PRs and issues welcome! Please document any changes to configuration or setup.

---

## License

MIT (or your project's license)
