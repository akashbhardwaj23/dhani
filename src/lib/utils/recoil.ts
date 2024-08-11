import { WalletType } from "@/lib/types/wallettypes"
import {atom} from "recoil"


const WalletValue : WalletType[] = [{
    publicKey : "",
    id : 0,
    balance : 0,

  }]

export const walletState = atom({
    key : "wallet-state",
    default : WalletValue
})



export const SecretKey = atom({
    key : "secret",
    default : ""
})