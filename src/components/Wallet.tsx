import { Appbar } from "@/ui/Appbar";
import { HomePage } from "./account/Home";
import { useEffect, useState } from "react";
import { ChangeWallet } from "./account/ChangeWallet";
import { createWalletSolana, getBalance } from "@/server/wallet";

export function Wallet({
  mnemonic
}: {
  mnemonic : string
}) {
  const [wallets, setWallets] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
     const createWalletAndGetBalance = async () => {
       const response = await createWalletSolana(mnemonic);
       console.log(response);
       setWalletPublicKey(response.publicKey);

       const balance = await getBalance(response.publicKey)
       console.log(balance);
       setBalance(balance)
     }

     createWalletAndGetBalance()
  }, [])

  return (
    <div className="max-w-xl w-full h-full border border-[#4c94ff] shadow-lg p-4 rounded-md">
      {wallets ? (
        <ChangeWallet setWallets={setWallets} balance={balance} walletPublicKey={walletPublicKey}/>
      ) : (
        <>
          <Appbar onClick={() => setWallets(true)} walletPublicKey={walletPublicKey} />
          <HomePage balance={balance} />
        </>
      )}
    </div>
  );
}
