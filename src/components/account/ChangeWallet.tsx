import { Dispatch, SetStateAction, useState } from "react";
import { Wallets } from "../Wallet";

export function ChangeWallet({
  setIsWallets,
  walletPublicKey,
  balance,
  setModel,
  model,
  wallets,
  setSellectedWallet,
  selectedWallet
}: {
  setIsWallets: Dispatch<SetStateAction<boolean>>;
  walletPublicKey: string;
  balance: number;
  setModel: Dispatch<SetStateAction<boolean>>;
  model: boolean;
  wallets: Wallets[] | null;
  setSellectedWallet: Dispatch<SetStateAction<number>>
  selectedWallet : number
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const copyPublicKey = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5_000);
    await navigator.clipboard.writeText(walletPublicKey);
  };

  return (
    <div>
      <div className={`flex mb-4`}>
        <div
          className=" flex items-center justify-center hover:cursor-pointer"
          onClick={() => setIsWallets((prev) => !prev)}
        >
          <svg
            className="size-6 text-red-500 hover:text-red-500/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-white text-2xl flex justify-center items-center font-semibold w-full">
          Wallets
        </h1>
      </div>
      <div className="p-2 flex justify-center mb-4">
        <div className="flex items-center rounded-full border border-black bg-[#202127] w-auto p-2 hover:bg-[#14151b] hover:cursor-pointer">
          <img
            src="https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png"
            alt="sol"
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-base text-white font-semibold mr-2">Solana</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#75798a"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      {wallets?.map((wallet) => (
        <div className={`bg-[#202127] p-6 flex justify-between items-center rounded-md  mb-8 ${selectedWallet === wallet.id ? "border-2 border-[#4c94ff]": ""} hover:bg-[#14151b] hover:cursor-pointer`} onClick={() => {
          setSellectedWallet(wallet.id)
          setIsWallets(false)
        }}>
          <div className="flex items-center">
            <img
              src="https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png"
              alt="sol"
              className="h-6 w-6 mr-8"
            />
            <div>
              <h1 className="text-white text-xl font-semibold">Wallet {wallet.id}</h1>
              <h2 className="text-[#969faf] text-base font-semibold">
                {wallet.publicKey.slice(0, 4)}...
                {wallet.publicKey.slice(
                  wallet.publicKey.length - 4,
                  wallet.publicKey.length
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-2 rounded-full hover:bg-black mr-8">
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#4c94ff"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#969faf"
                  className="size-8"
                  onClick={copyPublicKey}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              )}
            </div>
            <div className="p-2 rounded-full hover:bg-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#969faf"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
      <div
        className="text-[#4c94ff] font-bold text-base flex items-center gap-2 hover:cursor-pointer"
        onClick={() => setModel(true)}
      >
        <div className="flex justify-center items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <span className="flex justify-center items-center">
          Add new solana wallet
        </span>
      </div>
    </div>
  );
}
