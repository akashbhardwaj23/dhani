"use server"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { connection } from "./connection";
import db from "@/prisma/db"




export async function createUser(email: string, password: string, mneumonic: string, publicKey : string){
   
       try {

        const existingUser = await db.account.findFirst({
            where : {
                email
            }
        })

        if(existingUser){
            return {
                existingUser
            }
        }

        const balance = await getBalance(publicKey)

        const account = await db.account.create({
            data : {
                email,
                mneumonic ,
                password,
                Wallet : {
                    create : {
                        network : "SOLANA",
                        publicKey,
                        balance
                    }
                }
            }
        })

        return {
            account
        }
       } catch (error) {
        console.log(error)
        return null
       }
      
} 

export async function updateUser(accountId: number, publicKey : string){
        try {
                const balance = await getBalance(publicKey)
                const updateUser = await db.account.update({
                    where : {
                        id : Number(accountId)
                    },
                    data : {
                        Wallet :{
                            create : {
                                network : "SOLANA",
                                publicKey : publicKey,
                                balance
                            }
                        }
                    }
                })


                if(!updateUser){
                    return null
                }

                return {
                    updateUser
                }
            } catch (error) {
                console.log(error)
                return null
            }
}

export async function getUser(email : string,password : string){
    try {
        console.log('hi there in getUser')
        const user = await db.account.findFirst({
            where : {
                email ,
                password 
            },
            
        })

        console.log("There i am")

        if(!user){
            return null
        }

        return {
            user
        }
    } catch (error) {
        console.error
        return null
    }
}



export async function getUserWallet(email : string){
        try {
            const wallet = await db.account.findFirst({
                where : {
                    email
                },
                include : {
                    Wallet : {
                        select : {
                            id : true,
                            accountId : true,
                            publicKey : true,
                            balance : true
                        }

                    }
                }
            });

            if(!wallet){
                return null
            }
            return {
                wallet
            }
        } catch (error) {
            console.error;
            return null
        }
}

export async function getBalance(publicKey : string){
    const balance = await connection.getBalance(new PublicKey(publicKey))
    return balance/LAMPORTS_PER_SOL
}