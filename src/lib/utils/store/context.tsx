"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"; 
import { SelectedNetworkType, WalletType } from "@/lib/types/wallettypes"


interface SecretKeyType {
    walletId : string,
    secret : string
}

type StoreType = {
    wallets : WalletType[] | null,
    setWallets : Dispatch<SetStateAction<WalletType[] | null>>
    secretKeys : SecretKeyType[] | null,
    setSecretKeys : Dispatch<SetStateAction<SecretKeyType[] | null>>,
    authorized : boolean,
    setAuthorized : Dispatch<SetStateAction<boolean>>,
    selectedNetwork : SelectedNetworkType,
    setSelectedNetwork : Dispatch<SetStateAction<SelectedNetworkType>>
}
const StoreContext = createContext<StoreType | undefined>(undefined)



export function StoreContextProvider({
    children
} : {
    children : React.ReactNode
}){
    const [wallets, setWallets] = useState<WalletType[] | null>(null);
    const [secretKeys, setSecretKeys] = useState<SecretKeyType[] | null>(null);
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [selectedNetwork, setSelectedNetwork] = useState<SelectedNetworkType>("Solana")

    return (
        <StoreContext.Provider value={{wallets, setWallets, secretKeys, setSecretKeys, authorized, setAuthorized, selectedNetwork, setSelectedNetwork}}>
            {children}
        </StoreContext.Provider>
    )
}


export function useStoreContext(){
    const context = useContext(StoreContext);
    if(context === undefined){
        throw new Error("useStoreContext must be used within a StoreContextProvider");
    }
    return context
}



// import { SelectedNetworkType, WalletType } from "@/lib/types/wallettypes"
// import { createStore } from "zustand/vanilla"


// interface SecretKeyType {
//     walletId : string,
//     secret : string
// }

// export type Store = {
//     WalletState : WalletType[] | null,
//     SecretKey : SecretKeyType[] | null,
//     authorizedState : boolean,
//     selectedNetworkState : SelectedNetworkType
// }

// export type StoreActions = {
    
// }

// Use zustand later

