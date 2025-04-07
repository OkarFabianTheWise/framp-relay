import {
    Connection,
    PublicKey,
    VersionedTransaction,
    TransactionMessage,
    ComputeBudgetProgram,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";
  import bs58 from "bs58";
  import axios from "axios";
  
  import { GiftParams } from "./types";
  
  const JUPITER_SWAP_URL = "https://quote-api.jup.ag/v6/swap";
  const JUPITER_QUOTE_URL = "https://quote-api.jup.ag/v6/quote";
  
  export async function sendGiftToken({
    connection,
    walletPublicKey,
    signTransaction,
    recipient,
    amount,
    tokenMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  }: GiftParams): Promise<string> {
    const inputMint = "So11111111111111111111111111111111111111112"; // SOL
  
    // Step 1: Get Quote
    const lamports = Math.floor(amount * 1e9);
  
    const quoteResp = await axios.get(JUPITER_QUOTE_URL, {
      params: {
        inputMint,
        outputMint: tokenMint,
        amount: lamports,
        slippageBps: 1000,
      },
    });
  
    const quote = quoteResp.data;
  
    // Step 2: Get Destination Token Account (Jupiter handles creation if needed)
    const swapPayload = {
      userPublicKey: walletPublicKey.toBase58(),
      quoteResponse: quote,
      destinationTokenAccount: recipient,
      computeUnitPriceMicroLamports: 30000000,
    };
  
    // Step 3: Fetch Swap Transaction
    const swapResp = await axios.post(JUPITER_SWAP_URL, swapPayload);
    const swapTxB64 = swapResp.data.swapTransaction;
  
    const swapTxBytes = Buffer.from(swapTxB64, "base64");
    const transaction = VersionedTransaction.deserialize(swapTxBytes);
  
    // Step 4: Sign Transaction
    const signed = await signTransaction(transaction);
  
    // Step 5: Send Transaction
    const txId = await connection.sendRawTransaction(signed.serialize(), {
      skipPreflight: true,
    });
  
    await connection.confirmTransaction(txId, "confirmed");
  
    return txId;
  }
  