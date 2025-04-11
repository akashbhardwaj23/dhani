"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"; 
import { SelectedNetworkType, WalletType } from "@/lib/types/wallettypes"


interface SecretKeyType {
    walletId : string,
    secret : string
}

type StoreType = {
    userId : number | undefined
    setUserId : Dispatch<SetStateAction<number | undefined>>
    email : string | undefined
    setEmail : Dispatch<SetStateAction<string | undefined>>
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
    const [userId, setUserId] = useState<number | undefined>()
    const [email, setEmail] = useState<string | undefined>()
    const [wallets, setWallets] = useState<WalletType[] | null>(null);
    const [secretKeys, setSecretKeys] = useState<SecretKeyType[] | null>(null);
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [selectedNetwork, setSelectedNetwork] = useState<SelectedNetworkType>("SOLANA")

    return (
        <StoreContext.Provider value={{userId, setUserId, email, setEmail, wallets, setWallets, secretKeys, setSecretKeys, authorized, setAuthorized, selectedNetwork, setSelectedNetwork}}>
            {children}
        </StoreContext.Provider>
    )
}


export function getStoreContext(){
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

