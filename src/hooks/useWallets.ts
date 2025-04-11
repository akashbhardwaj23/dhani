import { StoreContext } from "@/lib/utils/store/context";
import { getUserWallets } from "@/server/user";
import { useContext, useEffect } from "react";

export function useStoreContext(){
    const context = useContext(StoreContext);
    if(context === undefined){
        throw new Error("useStoreContext must be used within a StoreContextProvider");
    }
    return context
}



export function useWallets(){
    const {wallets, setWallets, email} = useStoreContext();

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
    }, [email])

    return {
        wallets,
    }
}