import { SelectedActionType } from "@/lib/types/actiontype";
import { WalletType } from "@/lib/types/wallettypes";
import { useState } from "react";
import { useStoreContext } from "@/hooks/useWallets";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

export function ShowSecretAction({
  setSelectedAction,
  wallets,
  selectedWallet,
}: {
  setSelectedAction: SelectedActionType;
  wallets: WalletType[] | null;
  selectedWallet: number;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const { secretKeys } = useStoreContext();
  // const secretKey = secretKeys![0]?.secret;
  console.log(secretKeys)

  const wallet = wallets?.filter((w) => w.walletNumber === selectedWallet)[0];

  // const copy = async () => {
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 5_000);
  //   await navigator.clipboard.writeText(secretKey);
  // };

  return (
    <div className="relative flex w-[32rem] flex-col rounded-[20px] bg-gradient-to-tr from-white to-neutral-200 bg-clip-border shadow-md">
      <div className="p-10">
        <div className="flex flex-col justify-between mb-4">
          <div className="flex mb-4 px-4 pt-2 pb-4 text-4xl font-semibold text-neutral-800 tracking-tight w-full">
            <h1 className="flex justify-center font-mono items-center w-full">
              Show Private Key
            </h1>
          </div>

          <div className="w-full text-base flex flex-col items-center text-neutral-700 font-semibold mb-8">
            <div className="mb-2">
              <svg
                className="size-10 text-red-800 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>

            <h1 className="flex justify-center items-center text-xl mb-4">
              Your Private key
            </h1>
            <h2 className="flex mb-8">Never give your private key to anyone</h2>
            <input
              type="text"
              value={""}
              className="p-4 bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-900 w-full rounded-lg"
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col items-center text-base font-semibold p-4 w-full gap-4">
          <button
            className="flex justify-center items-center p-3 w-1/2 text-neutral-900 bg-white rounded-xl hover:bg-gray-200"
            onClick={() => {}}
          >
            
            {!copied ? (
             <LuCopy className="w-6 h-6" />
            ): (
             <LuCopyCheck className="w-6 h-6" />
            )}
          </button>

          <button
            className="flex justify-center items-center p-3 w-1/2 bg-[#202127] text-white rounded-[12px] hover:bg-[#18191f]"
            onClick={() => setSelectedAction("")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
