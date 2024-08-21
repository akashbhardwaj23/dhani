import { getUser, getUserWallet } from "@/server/user";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {walletState} from "@/lib/utils/state/recoil"




export function useWallets(email: string){
    const [wallets, setWallets] = useRecoilState(walletState)
    console.log("Usewallets ",wallets)

    useEffect(() => {
        console.log("Called UseEffect")
       if(!wallets){
        const getWallets = async () => {
            if(!email){
                const localWallets = JSON.parse(localStorage.getItem("wallets") || "");
                if(!localWallets){
                    return {
                        wallets,
                        setWallets
                    }
                }
                setWallets(localWallets);
                return {
                    wallets,
                    setWallets
                }

            }
            
            const account = await getUserWallet(email)
            if(!account){
                return
            }

            setWallets(account.wallet.Wallet)
       }

       getWallets()
       }

       localStorage.setItem("wallets", JSON.stringify(wallets))

    }, [])


    return {
        wallets,
        setWallets
    }

}