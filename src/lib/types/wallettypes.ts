import { Dispatch, SetStateAction } from "react";

export interface WalletType {
    publicKey : string;
    id : number;
    assetBalance : number | null,
    usdcBalance : number | null
    accountId : number
  }

  export type IswalletsPageType = "wallet" | "change-wallet";

  export type SetWalletType = Dispatch<SetStateAction<WalletType[] | null>>
  
  export type AssetComponentsType = "home" | "send" | "receive" | "swap";

  export type SelectedNetworkType = "Solana" | "Ethereum";

  export interface CopyWallet {
    walletId: number;
    value: boolean;
  }
  
  
  