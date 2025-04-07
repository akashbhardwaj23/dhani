import { SelectedActions, SetActionBooleanType } from "@/lib/types/actiontype";
import { WalletType } from "@/lib/types/wallettypes";
import { useState } from "react";
import {
  RemoveWalletAction,
  RenameWalletAction,
  ShowSecretAction,
} from "../wallet-options";

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
    return <RemoveWalletAction setSelectedAction={setSelectedAction} />;
  } else {
    return (
      <div className="relative flex w-[40rem] flex-col rounded-xl bg-[#1FB4DC] bg-clip-border text-gray-100 shadow-md">
        <div className="p-8">
          <div className="flex flex-col">
            <div className="flex mb-6 px-4 pt-2 pb-4 items-center text-xl text-black w-full">
              <div
                className="hover:cursor-pointer"
                onClick={() => setOptions(false)}
              >
                <svg
                  className="size-8 text-red-500 hover:text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
              </div>
              <div className="flex justify-center w-full">
                <h1 className="font-mono text-5xl text-white font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Wallet {wallet?.walletNumber}
                </h1>
              </div>
            </div>

            <div className="relative rounded-lg shadow-md bg-gray-100 text-base mb-4 text-black font-semibold">
              <div className="flex justify-between p-4 hover:bg-gray-300 hover:cursor-pointer rounded-t-lg">
                <h1>Wallet Address</h1>
                <div className="flex justify-center items-center gap-2">
                  <h2 className="mr-4">
                    {wallet?.publicKey.slice(0, 4)}...
                    {wallet?.publicKey.slice(
                      wallet.publicKey.length - 4,
                      wallet.publicKey.length
                    )}
                  </h2>
                  <div className="" onClick={copyText}>
                    {!copied ? (
                      <svg
                        className="size-8 text-neutral-500"
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
                        <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                      </svg>
                    ) : (
                      <svg
                        className="size-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
                className="flex justify-between p-4 rounded-b-lg hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => setSelectedAction("rename-wallet")}
              >
                <h1>Rename Wallet</h1>
                <div>
                  <svg
                    className="size-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow-md bg-gray-100 text-base text-black mb-4 font-semibold hover:bg-gray-300">
              <div
                className="flex justify-between items-center p-4 hover:cursor-pointer"
                onClick={() => setSelectedAction("show-privatekey")}
              >
                <h1>Show private key</h1>
                <div>
                  <svg
                    className="size-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow-md bg-gray-100 text-base text-red-500 mb-8 font-semibold hover:bg-gray-300">
              <div
                className="flex justify-between items-center p-4 hover:cursor-pointer"
                onClick={() => setSelectedAction("remove-wallet")}
              >
                <h1>Remove wallet</h1>
                <div>
                  <svg
                    className="size-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
