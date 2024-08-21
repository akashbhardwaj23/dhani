import { SolanaImageUrl } from "@/config/assets";
import { WalletType } from "@/lib/types/wallettypes";
import { useState } from "react";

export function Appbar({
  onClick,
  wallet,
  selectedWallet,
}: {
  onClick: () => void;
  wallet : WalletType | undefined
  selectedWallet: number;
}) {
  
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 5_000);
    await navigator.clipboard.writeText(wallet?.publicKey || "")
  }

  return (
    <div className="w-full p-8 flex justify-between">
      <div className="flex justify-center items-center">
        <img src={"/icon.png"} alt="icon" className="w-12 h-12 contrast-200 drop-shadow-blue-shadow" />
      </div>

      <div className="flex justify-center items-center ">
        <div className="w-[42rem] grid grid-cols-5 h-full items-center bg-[#141718] rounded-3xl  border border-[#37383d] shadow-sm shadow-[#1FB4DC]">
          <div className="p-2 pl-12 rounded-l-3xl float-left col-span-1 hover:bg-[#0e0f14] hover:cursor-pointer">
            <img src={SolanaImageUrl} alt="sol" className="w-8 h-8" />
          </div>
          <div className="flex border-x-2 border-[#37383d] h-full justify-center items-center col-span-3 text-base text-white font-semibold hover:bg-[#0e0f14] hover:cursor-pointer" onClick={onClick}>
            <span className="mr-6 text-lg">Wallet {selectedWallet}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#8d96a4"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div className="p-2 h-full flex justify-center items-center rounded-r-3xl col-span-1 hover:bg-[#0e0f14] hover:cursor-pointer" onClick={copy}>
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#4c94ff"
                className="size-7"
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
                strokeWidth="1.5"
                stroke="#4a4d59"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-white font-mono font-semibold rounded-full p-2 bg-[#1A8DDD] h-10 w-10 shadow-md">
        A
      </div>
    </div>
  );
}
