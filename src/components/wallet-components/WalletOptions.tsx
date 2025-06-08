import { SelectedActions, SetActionBooleanType } from "@/lib/types/actiontype";
import { WalletType } from "@/lib/types/wallettypes";
import { useState } from "react";
import {
  RemoveWalletAction,
  RenameWalletAction,
  ShowSecretAction,
} from "../wallet-options";
import { LuArrowLeft, LuChevronRight, LuCopy, LuCopyCheck } from "react-icons/lu"


// Need to change the name
export function WalletOptions({
  setOptions,
  wallets,
  selectedWallet,
}: {
  setOptions: SetActionBooleanType;
  wallets: WalletType[] | null;
  selectedWallet: number;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<SelectedActions>("");
  const wallet = wallets?.filter((w) => w.walletNumber === selectedWallet)[0];

  const copyText = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5_000);
    await navigator.clipboard.writeText(wallet?.publicKey || "");
  };

  if (selectedAction === "show-privatekey") {
    return (
      <ShowSecretAction
        setSelectedAction={setSelectedAction}
        wallets={wallets}
        selectedWallet={selectedWallet}
      />
    );
  } else if (selectedAction === "rename-wallet") {
    return (
      <>
        <RenameWalletAction setSelectedAction={setSelectedAction} />
      </>
    );
  } else if (selectedAction === "remove-wallet") {
    return <RemoveWalletAction setSelectedAction={setSelectedAction} wallet={wallet!} setOptions = {setOptions} />;
  } else {
    return (
      <div className="relative flex w-[32rem] flex-col rounded-[20px] bg-gradient-to-br from-white to-neutral-200 bg-clip-border text-gray-100 shadow-md">
        <div className="p-8 md:p-10">
          <div className="flex flex-col">
            <div className="flex mb-6 md:px-4 pt-2 pb-4 items-center text-xl text-black w-full">
              <div
                className="hover:cursor-pointer"
                onClick={() => setOptions(false)}
              >
               <LuArrowLeft className="w-8 h-8 text-neutral-800 hover:text-neutral-700" />
              </div>
              <div className="flex justify-center w-full">
                <h1 className="font-mono text-5xl text-neutral-800 font-semibold leading-snug tracking-tighter text-blue-gray-900 antialiased">
                  Wallet {wallet?.walletNumber}
                </h1>
              </div>
            </div>

            <div className="relative rounded-lg shadow-md bg-neutral-100 text-base mb-4 text-black font-semibold">
              <div className="flex justify-between p-4 hover:bg-neutral-300 hover:cursor-pointer rounded-t-lg" onClick={copyText}>
                <h1>Wallet Address</h1>
                <div className="flex justify-center items-center gap-2">
                  <h2 className="text-sm md:text-base md:mr-4">
                    {wallet?.publicKey.slice(0, 4)}...
                    {wallet?.publicKey.slice(
                      wallet.publicKey.length - 4,
                      wallet.publicKey.length
                    )}
                  </h2>
                  <div>
                    {!copied ? (
                      <LuCopy className="size-5 md:size-6" />
                      
                    ) : (
                      <LuCopyCheck className="size-5 md:size-6" />
                    )}
                  </div>
                </div>

                {copied ? (
                  <div className="absolute top-10 p-4 text-sm right-6 rounded-2xl text-black ">
                    Copied
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className="flex justify-between p-4 rounded-b-lg hover:bg-neutral-300 hover:cursor-pointer"
                onClick={() => setSelectedAction("rename-wallet")}
              >
                <h1>Rename Wallet</h1>
                <div>
                  <LuChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow-md bg-neutral-100 text-base text-black mb-4 font-semibold hover:bg-neutral-300">
              <div
                className="flex justify-between items-center p-4 hover:cursor-pointer"
                onClick={() => setSelectedAction("show-privatekey")}
              >
                <h1>Show private key</h1>
                <div>
                  <LuChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow-md bg-neutral-100 text-base text-red-500 mb-8 font-semibold hover:bg-neutral-300">
              <div
                className="flex justify-between items-center p-4 hover:cursor-pointer"
                onClick={() => setSelectedAction("remove-wallet")}
              >
                <h1>Remove wallet</h1>
                <div>
                  <LuChevronRight className="w-6 h-6 text-red-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
