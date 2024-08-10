import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"
import { Keypair, PublicKey } from "@solana/web3.js"
import { connection } from "./connection";




export async function createWalletSolana(mnemonic : string){
    const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/0'/0'`; // This is the derivation path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        return {
            publicKey,
            secret
        }
} 

export async function createNewWallet(mnemonic : string, walletNumber : Number){
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${walletNumber}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    
    return {
        publicKey,
        secret
    }
}

export async function getBalance(publicKey : string){
    const balance = await connection.getBalance(new PublicKey(publicKey))
    return balance
}