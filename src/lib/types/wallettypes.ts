import { Dispatch, SetStateAction } from "react";

export interface WalletType {
    publicKey : string;
    assetBalance : number | null,
    walletNumber : number
    usdcBalance : number | null
    useraccountId : number,
    network : SelectedNetworkType
  }

  export type IswalletsPageType = "wallet" | "change-wallet";

  export type SetWalletType = Dispatch<SetStateAction<WalletType[] | null>>
  
  export type AssetComponentsType = "home" | "send" | "receive" | "swap";

  export type SelectedNetworkType = "SOLANA" | "ETHEREUM";

  // type NetworkType = "SOLANA" | "ETHEREUM"

  export interface CopyWallet {
    walletId: number;
    value: boolean;
  }
  
  
  