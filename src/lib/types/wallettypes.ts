import { Dispatch, SetStateAction } from "react";

export interface WalletType {
    publicKey : string;
    id : number;
    balance? : number
  }

  export type SetWalletType = Dispatch<SetStateAction<WalletType[] | null>>