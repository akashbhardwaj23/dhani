import { getUserWallet } from "@/server/user";
import { useEffect } from "react";
import { useStoreContext } from "@/lib/utils/store/context";




export function useWallets(email: string){
    const {wallets, setWallets} = useStoreContext();
    console.log("Usewallets ",wallets)

    useEffect(() => {
       if(!wallets){
        const getWallets = async () => {
            if(!email){
                
                const localWalletsString = localStorage.getItem("wallets");
                if(!localWalletsString){
                    return {
                        wallets,
                        setWallets
                    }
                }
                const localWallets = JSON.parse(localWalletsString || "")

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

    })


    return {
        wallets,
        setWallets
    }

}