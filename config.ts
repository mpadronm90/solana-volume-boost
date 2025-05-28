import dotenv from 'dotenv';
import { PublicKey, Connection, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

dotenv.config();

export const rayFee = new PublicKey(process.env.RAY_FEE!);
export const tipAcct = new PublicKey(process.env.TIP_ACCT!);
export const RayLiqPoolv4 = new PublicKey(process.env.RAY_LIQ_POOL_V4!);

export const connection = new Connection(process.env.RPC_URL!, {
  commitment: 'confirmed',
});

export const wallet = Keypair.fromSecretKey(
  bs58.decode(process.env.SOL_SENDER_PRIV_KEY!)
);

