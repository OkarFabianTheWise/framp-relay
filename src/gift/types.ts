import { Connection, PublicKey, VersionedTransaction } from "@solana/web3.js";

export interface GiftParams {
  connection: Connection;
  walletPublicKey: PublicKey;
  signTransaction: (tx: VersionedTransaction) => Promise<VersionedTransaction>;
  recipient: string;
  amount: number; // in tokens (not lamports)
  tokenMint?: string; // defaults to USDC
}
