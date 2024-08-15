"use server"
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"
import { Keypair, PublicKey } from "@solana/web3.js"
import { connection } from "./connection";
import db from "@/prisma/db"
import { OnBoardingTasksType } from "@/lib/types/onBoarding";
import { PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";




export async function createWalletSolana(onBoardingData : OnBoardingTasksType){
    const seed = mnemonicToSeedSync(onBoardingData.mneumonic);
        const path = `m/44'/501'/0'/0'`; // This is the derivation path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
       try {
        const account = await db.account.create({
            data : {
                mneumonic : onBoardingData.mneumonic,
                password : onBoardingData.password,
                Wallet : {
                    create : {
                        network : "SOLANA",
                        publicKey : publicKey
                    }
                }
            }
        })



        return {
            publicKey,
            secret,
            account
        }
       } catch (error) {
        console.log(error)
        return {
            publicKey,
            secret
        }
       }
      
} 

export async function createNewWallet(mneumonic: string, walletNumber : Number, accountId : number){
    const seed = mnemonicToSeedSync(mneumonic);
    const path = `m/44'/501'/${walletNumber}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

try {
    
    const account = await db.account.update({
        where : {
            id : accountId
        },
        data : {
            Wallet : {
                create : {
                    network : 'SOLANA',
                    publicKey : publicKey,
                }
            }
        }
        
    })

    return {
        publicKey,
        secret,
        account
    }
} catch (error) {
    console.log(error)
    return {
      publicKey,
      secret
    }
}
}

export async function getBalance(publicKey : string){
    const balance = await connection.getBalance(new PublicKey(publicKey))
    return balance
}