import { SolanaImageUrl } from "@/config/assets";
import { AssetComponentsType, WalletType } from "@/lib/types/wallettypes";
import { Appbar } from "@/components/ui/Appbar";
import { useState } from "react";
import { Swap } from "../wallet-actions/Swap";
import { Receive } from "../wallet-actions/ReceiveAssets";
import { SendAssets } from "../wallet-actions/SendAssets";


export function HomePage({
  wallets,
  selectedWallet,
  onClick,
  onClickAppbar,
}: {
  wallets: WalletType[] | null;
  selectedWallet: number;
  onClick: () => void;
  onClickAppbar: () => void;
}) {
  const [assetsComponents, setAssetsComponents] =
    useState<AssetComponentsType>("home");

  const wallet = wallets?.filter((wallet) => wallet.id === selectedWallet)[0];
  const balance = wallet?.balance;

  return (
    <>
      {assetsComponents === "home" && (
        <>
          <Appbar onClick={onClickAppbar} selectedWallet={selectedWallet} />

          <div className="mt-16 mb-6">
            <div className=" flex justify-center text-4xl mb-3 text-white">
              $ {balance}
            </div>
            <div className=" flex justify-center text-xl text-[#b7b7b6] mb-3">
              Percentage
            </div>

            <div className="flex justify-center ">
              <button className="flex justify-center text-base text-white p-2 bg-transparent rounded-md hover:cursor-pointer" onClick={onClick}>
                <svg
                  className="size-8 text-teal-500 active:animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex max-w-xl justify-center gap-16 p-4 text-white text-xl mb-8">
            <div
              className="flex flex-col items-center justify-center"
              onClick={() => setAssetsComponents("receive")}
            >
              <button className="p-4 rounded-full bg-[#202127] mb-2 hover:bg-[#1a1b21]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#4c94ff"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="#4c94ff"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                  />
                </svg>
              </button>
              <span className="text-[#8e94ab] font-semibold">Receive</span>
            </div>
            <div
              className="flex flex-col items-center justify-center"
              onClick={() => setAssetsComponents("send")}
            >
              <button className="p-4 rounded-full bg-[#202127] mb-2 hover:bg-[#1a1b21]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="#4c94ff"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                  />
                </svg>
              </button>
              <span className="text-[#8e94ab] font-semibold">Send</span>
            </div>
            <div
              className="flex flex-col items-center justify-center"
              onClick={() => setAssetsComponents("swap")}
            >
              <button className="p-4 rounded-full bg-[#202127] mb-2 hover:bg-[#1a1b21]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="#4c94ff"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </button>
              <span className="text-[#8e94ab] font-semibold">Swap</span>
            </div>
          </div>

          <div className="border-t border-white mb-4"></div>

          <div className="w-full hover:bg-[#14151b] rounded-md">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <img
                  src={SolanaImageUrl}
                  alt="sol"
                  className="w-14 h-14 mr-8"
                />
                <div className="">
                  <h1 className="text-white text-xl">Solana</h1>
                  <h2 className="text-[#969faf] text-base">{balance} SOL</h2>
                </div>
              </div>
              <div className="">
                <h1 className="text-white font-semibold text-xl">
                  $ {balance}
                </h1>
                <h2 className="text-[#039e64] text-base text-center font-semibold">
                  0.32%
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
      {assetsComponents === "send" && (
        <SendAssets setAssetsComponents={setAssetsComponents} />
      )}
      {assetsComponents === "swap" && (
        <Swap setAssetsComponents={setAssetsComponents} />
      )}
      {assetsComponents === "receive" && (
        <Receive
          publicKey={wallet?.publicKey}
          setAssetsComponents={setAssetsComponents}
        />
      )}
    </>
  );
}
