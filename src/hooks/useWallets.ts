import { getStoreContext } from "@/lib/utils/store/context";
import { getUserWallets } from "@/server/user";
import { useEffect } from "react";


export function useWallets(){
    const {wallets, setWallets, email} = getStoreContext();

    useEffect(() => {
        console.log("Email is ", email)
        if(email){
            console.log("Getting the wallets")
            const getWallets = async () => {
                console.log("getting wallet")
                const newWallets = await getUserWallets(email)
                if(!newWallets){
                    console.log("no new wallet")
                    return
                }
    
                setWallets(newWallets.wallets)
           }
    
           getWallets()
        }
    }, [])

    return {
        wallets,
    }
}