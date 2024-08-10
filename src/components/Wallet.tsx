import { Appbar } from "@/ui/Appbar";
import { HomePage } from "./account/Home";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChangeWallet } from "./account/ChangeWallet";
import { createWalletSolana, getBalance } from "@/server/wallet";

export function Wallet({ mnemonic }: { mnemonic: string }) {
  const [wallets, setWallets] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [model, setModel] = useState<boolean>(false);

  useEffect(() => {
    const createWalletAndGetBalance = async () => {
      const response = await createWalletSolana(mnemonic);
      console.log(response);
      setWalletPublicKey(response.publicKey);

      const balance = await getBalance(response.publicKey);
      console.log(balance);
      setBalance(balance);
    };

    createWalletAndGetBalance();
  }, []);

  return (
    <>
      <div
        className={`max-w-xl w-full h-full border border-[#4c94ff] shadow-lg p-4 rounded-md ${
          model ? "blur-sm" : ""
        }`}
      >
        {wallets ? (
          <ChangeWallet
            setWallets={setWallets}
            balance={balance}
            walletPublicKey={walletPublicKey}
            setModel={setModel}
            model={model}
          />
        ) : (
          <>
            <Appbar
              onClick={() => setWallets(true)}
              walletPublicKey={walletPublicKey}
            />
            <HomePage balance={balance} />
          </>
        )}
      </div>
      {model && <Model setModel={setModel} />}
    </>
  );
}

function Model({
  setModel
}: {
  setModel : Dispatch<SetStateAction<boolean>>
}) {

  const  generateNewWallet = async () => {
    
  }

  return (
    <div className="absolute flex justify-center w-2/5">
      <div className="w-full h-full border border-[#4c94ff] text-white p-4">
        <div className="mb-12 hover:cursor-pointer" onClick={() => setModel(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="#747889"
            className="size-6 hover:animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center mb-8">
          <img src="/airdrop.png" alt="airdrop" className="w-20 h-20 mb-4" />
          <h1 className="text-4xl text-white font-semibold mb-4">Account 1</h1>
          <h2 className="text-xl text-[#202127] font-semibold">
            Add a new Solana wallet to this account.
          </h2>
        </div>

        <div className="p-6 rounded-lg flex bg-[#202127] hover:bg-[#1d1d23] hover:cursor-pointer" onClick={generateNewWallet}>
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Create a new Wallet</h1>
        </div>
      </div>
    </div>
  );
}
