```md
# framp-relay

> A lightweight Solana SDK to enable seamless token gifting with Jupiter swap integration.

---

## ✨ Features

- 🔁 Swap from SOL or any SPL token to a recipient
- 🎁 Deliver tokens directly to a wallet
- 🔐 Wallet-signable transaction support for browser dApps
- ⚡ Powered by Jupiter Aggregator

---

## 📦 Installation

```bash
npm install framp-relay
```

---

## 🚀 Usage

```ts
import { sendGiftToken } from "framp-relay/gift";
import { Connection, PublicKey } from "@solana/web3.js";

// Example
const txId = await sendGiftToken({
  connection: new Connection("https://api.mainnet-beta.solana.com"),
  walletPublicKey: new PublicKey("YOUR_WALLET_ADDRESS"),
  signTransaction, // from connected wallet adapter
  recipient: "RECIPIENT_WALLET_ADDRESS",
  amount: 1.5, // amount in full tokens, not lamports
  tokenMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" // defaults to USDC
});
```

---

## 🧰 Parameters

| Field             | Type                       | Description                                |
|------------------|----------------------------|--------------------------------------------|
| `connection`      | `Connection`               | Solana RPC connection                      |
| `walletPublicKey` | `PublicKey`                | Sender's wallet public key                 |
| `signTransaction` | `(tx) => Promise<tx>`      | Wallet's transaction signer                |
| `recipient`       | `string`                   | Recipient wallet address                   |
| `amount`          | `number`                   | Amount in tokens (e.g., 1.25 USDC)         |
| `tokenMint?`      | `string`                   | Optional SPL token mint address            |

---

## 🛠 Dev Scripts

```bash
# Run test script (you can customize src/test.ts)
npm run test
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 🧙 Author

**[OkarFabianThewise](https://github.com/OkarFabianThewise)**

---

## 🪪 License

ISC © 2025
```