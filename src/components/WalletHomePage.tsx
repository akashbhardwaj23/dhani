import { AssetComponentsType, WalletType } from "@/lib/types/wallettypes";
import { Appbar } from "./appbar/Appbar";
import { AssetsCard, Card, MyAssetsCard } from "./ui/Card";
import { useState } from "react";
import { SendAssets } from "./wallet-actions/SendAssets";
import { Swap } from "./wallet-actions/Swap";
import { Receive } from "./wallet-actions/ReceiveAssets";




export default function WalletHomePage({
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
  const assetBalance = wallet?.assetBalance;
  console.log(assetBalance);

  return (
    <>
      {assetsComponents === "home" && (
        <div className="w-full">
          <Appbar
            wallet={wallet}
            onClick={onClickAppbar}
            selectedWallet={selectedWallet}
          />
          <div className="w-full grid grid-cols-4 gap-2 absolute z-10 p-4 pr-6">
            <div className="col-span-2 flex justify-center">
              <Card />
            </div>

            <div className="flex justify-center col-span-2">
              <MyAssetsCard
              onClick={onClick}
                wallet={wallet}
                setAssetsComponents={setAssetsComponents}
              />
            </div>
          </div>

          <div className="bg-transparent ml-96 rounded-full mt-10 w-44 h-32 shadow-background"></div>

          <div className="w-full p-4 absolute top-[30rem] flex justify-center pr-6">
            <AssetsCard wallet={wallet} />
          </div>
        </div>
      )}

      {assetsComponents === "send" && (
        <SendAssets
          senderPublicKey={wallet?.publicKey || ""}
          setAssetsComponents={setAssetsComponents}
        />
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
