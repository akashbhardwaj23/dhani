import { getUserWallets } from "@/server/user";
import { useEffect } from "react";
import { useStoreContext } from "@/lib/utils/store/context";




export function useWallets(email: string){
    const {wallets, setWallets} = useStoreContext();
    // console.log("Usewallets ", wallets)

    useEffect(() => {
       if(!wallets){
        const getWallets = async () => {
            // if(!email){
                
            //     const localWalletsString = localStorage.getItem("wallets");
            //     if(!localWalletsString){
            //         return 
            //     }
            //     const localWallets = JSON.parse(localWalletsString || "")

            //     setWallets(localWallets);
            //    return

            // }
            
            const newWallets = await getUserWallets(email)
            if(!newWallets){
                return
            }

            setWallets(newWallets.wallets)
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




export function createWallets(){
    const {wallets, setWallets} = useStoreContext()

    useEffect(() => {

    }, [])
}