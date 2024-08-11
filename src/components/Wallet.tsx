import { Appbar } from "@/ui/Appbar";
import { HomePage } from "./account/Home";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChangeWallet } from "./account/ChangeWallet";
import { createNewWallet, createWalletSolana, getBalance } from "@/server/wallet";



export interface Wallets {
  publicKey : string;
  id : number;
  balance? : number
}

export function Wallet({ mnemonic }: { mnemonic: string }) {
  const [iswallets, setIsWallets] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [model, setModel] = useState<boolean>(false);
  const [wallets, setWallets] = useState<Wallets[] | null>(null);
  const [selectedWallet, setSellectedWallet] = useState<number>(1)

  useEffect(() => {
    const createWalletAndGetBalance = async () => {
      console.log("Redering again")
      const response = await createWalletSolana(mnemonic);
      console.log(response);
      const balance = await getBalance(response.publicKey);
      console.log(balance);
      setBalance(balance);

      setWalletPublicKey(response.publicKey);
      setWallets(prev => {
        if(prev){
          return [...prev, {
            publicKey : response.publicKey,
            id : prev.length + 1,
            balance : balance
          }]
        } else {
          return [{
            publicKey : response.publicKey,
            id : 1,
            balance : balance
          }]
        }
      })

      
    };

    createWalletAndGetBalance();
  }, []);

  console.log(wallets)

  return (
    <>
      <div
        className={`max-w-xl w-full h-full border border-[#4c94ff] shadow-lg p-4 rounded-md ${
          model ? "blur-sm" : ""
        }`}
      >
        {iswallets ? (
          <ChangeWallet
            setIsWallets={setIsWallets}
            balance={balance}
            walletPublicKey={walletPublicKey}
            setModel={setModel}
            wallets= {wallets}
            model={model}
            setSellectedWallet={setSellectedWallet}
            selectedWallet={selectedWallet}

            
          />
        ) : (
          <>
            <Appbar
              onClick={() => setIsWallets(true)}
              walletPublicKey={walletPublicKey}
              selectedWallet={selectedWallet}
            />
            <HomePage balance={balance} />
          </>
        )}
      </div>
      {model && <Model setModel={setModel} mnemonic={mnemonic} wallets={wallets} setWallets={setWallets}  />}
    </>
  );
}

function Model({ setModel, mnemonic, wallets, setWallets }: { setModel: Dispatch<SetStateAction<boolean>>; mnemonic : string; wallets : Wallets[] | null; setWallets: Dispatch<SetStateAction<Wallets[] | null>>}) {
  const generateNewWallet = async () => {
    if(wallets){
      const response = await createNewWallet(mnemonic, wallets[wallets.length - 1].id);
      const balance = await getBalance(response.publicKey);
      console.log(balance);
      setWallets(prev => {
        if(prev){
          return [...prev, {
            publicKey : response.publicKey,
            id : prev.length + 1,
            balance : balance
          }]
        }
        else {
          return [{publicKey : response.publicKey, id : 1, balance : balance}]
        }
      })
    }

    setModel(false)
    
  };

  return (
    <div className="absolute top-10 flex justify-center w-2/5">
      <div className="w-full h-full rounded-lg border border-[#4c94ff] text-white p-4">
        <div
          className="mb-8 p-4 flex justify-start hover:cursor-pointer"
          onClick={() => setModel(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="#747889"
            className="size-8 text-red-500 hover:animate-bounce"
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
          <h2 className="text-xl text-[#9ea3be] font-semibold">
            Add a new Solana wallet to this account.
          </h2>
        </div>

        <div
          className="p-6 rounded-lg flex bg-[#202127] mb-4 hover:bg-[#1d1d23] hover:cursor-pointer"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
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

        <div
          className="p-6 rounded-lg flex bg-[#202127] mb-4 hover:bg-[#1d1d23] hover:cursor-pointer"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              className="size-6 text-red-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" />{" "}
              <path
                d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1"
                transform="rotate(120 12 13)"
              />{" "}
              <path
                d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1"
                transform="rotate(240 12 13)"
              />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Recovery Phase</h1>
        </div>

        <div
          className="p-6 rounded-lg flex bg-[#202127] mb-4 hover:bg-[#1d1d23] hover:cursor-pointer"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              className="size-6 text-red-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <circle cx="8" cy="15" r="4" />{" "}
              <line x1="10.85" y1="12.15" x2="19" y2="4" />{" "}
              <line x1="18" y1="5" x2="20" y2="7" />{" "}
              <line x1="15" y1="8" x2="17" y2="10" />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Private Key</h1>
        </div>

        <div
          className="p-6 rounded-lg flex bg-[#202127] mb-4 hover:bg-[#1d1d23] hover:cursor-pointer"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              className="size-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Show only Public key</h1>
        </div>
      </div>
    </div>
  );
}
