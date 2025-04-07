"use server"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { connection } from "./connection";
import db from "@/prisma/db"
import axios from "axios"


export async function createUser(email: string, password: string, mneumonic: string, iv : string, key : string, publicKey : string){
   
       try {

        const existingUser = await db.userAccount.findFirst({
            where : {
                email
            }
        })

        if(existingUser){
            return {
                account : existingUser
            }
        }

        const balance = await getBalance(publicKey)


        const walletNumber = await db.wallet.findFirst({
            where : {
                publicKey
            },
            select : {
                walletNumber : true
            }
        })

        const userAccount = await db.userAccount.create({
            data : {
                email,
                mneumonic ,
                iv,
                key,
                password,
                Wallet : {
                    create : {
                        network : "SOLANA",
                        walletNumber : walletNumber?.walletNumber || 1,
                        publicKey,
                        assetBalance : balance.orignalBalance,
                        usdcBalance : Number(balance.usdcPrice)
                    }
                }
            }
        })

        return {
            account : userAccount
        }
       } catch (error) {
        console.log(error)
        return null
       }
      
} 


export async function getUserMneumonic(email : string){
    try {
        const user = await db.userAccount.findFirst({
            where : {
                email
            },
            select : {
                mneumonic : true,
                iv : true,
                key : true
            }
        })

        if(!user){
            return null
        }

        return {
            mneumonic : user.mneumonic,
            iv : user.iv,
            key : user.key
        }
    } catch (error) {
        console.log(error)
        return null
    }
}


export async function getUserWallets(email : string){
    try {
       const data = await db.userAccount.findFirst({
        where : {
            email
        },
        select : {
            Wallet : true
        }
       })

       if(!data){
        return null
       }

       return {
        wallets : data.Wallet
       }
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateUser(accountId: number, publicKey : string){
        try {
                const balance = await getBalance(publicKey)

                const data = await db.userAccount.findFirst({
                    where : {
                        id : accountId
                    }, 
                    select : {
                        Wallet : true
                    }
                })

                if(!data?.Wallet){
                    return 
                }

                const updateUser = await db.userAccount.update({
                    where : {
                        id : Number(accountId)
                    },
                    data : {
                        Wallet :{
                            create : {
                                network : "SOLANA",
                                walletNumber : data.Wallet.length + 1,
                                publicKey : publicKey,
                                assetBalance : balance.orignalBalance,
                                usdcBalance : Number(balance.usdcPrice)
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
        const user = await db.userAccount.findFirst({
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



// export async function getUserWallet(email : string){
//         try {
//             const wallet = await db.userAccount.findFirst({
//                 where : {
//                     email
//                 },
//                 include : {
//                     Wallet : {
//                         select : {
//                             id : true,
//                             useraccountId : true,
//                             walletNumber : true,
//                             publicKey : true,
//                             assetBalance : true,
//                             usdcBalance : true
//                         }

//                     }
//                 }
//             });

//             if(!wallet){
//                 return null
//             }
//             return {
//                 wallet
//             }
//         } catch (error) {
//             console.error;
//             return null
//         }
// }

export async function getBalance(publicKey : string){
    const balance = await connection.getBalance(new PublicKey(publicKey));
    console.log("Balance is ",balance)
    const orignalBalance = balance/LAMPORTS_PER_SOL;
    const SOLANA_ADDRESS = 'So11111111111111111111111111111111111111112'
    const response = await axios.get(`https://api.jup.ag/price/v2?ids=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,${SOLANA_ADDRESS}`);


   const price = response.data
   console.log(price.data.So11111111111111111111111111111111111111112)
    const originalUsdcPrice = price.data.So11111111111111111111111111111111111111112.price * orignalBalance;
    const usdcPrice = originalUsdcPrice.toFixed(3) 

    return {
        orignalBalance,
        usdcPrice
    }
}


export async function getUserBalanceOnDevnet(publicKey : string){

}