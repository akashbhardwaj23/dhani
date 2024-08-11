import { Dispatch, SetStateAction } from "react";


export type SelectedActions =
  | ""
  | "rename-wallet"
  | "show-privatekey"
  | "remove-wallet";


export type SelectedActionType = Dispatch<SetStateAction<SelectedActions>>

export type SetActionBooleanType = Dispatch<SetStateAction<boolean>>