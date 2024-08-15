import { Dispatch, SetStateAction } from "react";

export interface WalletType {
    publicKey : string;
    id : number;
    balance? : number,
    accountId : number
  }

  export type SetWalletType = Dispatch<SetStateAction<WalletType[] | null>>
  
  export type AssetComponentsType = "home" | "send" | "receive" | "swap";