import { Dispatch, SetStateAction, useState } from "react";
import { IswalletsPageType, WalletType } from "@/lib/types/wallettypes";;
import { SetActionBooleanType } from "@/lib/types/actiontype";
import { WalletCard } from "@/components/wallet-components/WalletCardComponent";
import { WalletOptions } from "../wallet-components/WalletOptions";


export function ChangeWallet({
  setIsWalletsPage,
  setModel,
  wallets,
  setSellectedWallet,
  selectedWallet,
}: {
  setIsWalletsPage: Dispatch<SetStateAction<IswalletsPageType>>;
  setModel: SetActionBooleanType;
  wallets: WalletType[] | null;
  setSellectedWallet: Dispatch<SetStateAction<number>>;
  selectedWallet: number;
}) {
  const [options, setOptions] = useState<boolean>(false);

  return (
    <div className="w-full absolute max-w-4xl px-4 md:px-0 flex justify-center items-center top-20">
      {options ? (
        <WalletOptions setOptions={setOptions} wallets ={wallets} selectedWallet={selectedWallet} />
      ) : (

        <WalletCard 
          setIsWalletsPage={setIsWalletsPage}
          setModel={setModel}
          setSellectedWallet={setSellectedWallet}
          setOptions={setOptions}
      />
      )}
    </div>
  );
}
