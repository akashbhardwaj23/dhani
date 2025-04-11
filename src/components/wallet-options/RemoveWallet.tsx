import { SelectedActionType, SetActionBooleanType } from "@/lib/types/actiontype";
import { WalletType } from "@/lib/types/wallettypes";
import { removeWalletWithPublicKey } from "@/server/user";
import axios from "axios";
import { LuArrowLeft, LuCheck, LuChevronDown, LuCirclePlus, LuCopy, LuCopyCheck, LuMenu } from "react-icons/lu"

export function RemoveWalletAction({
  setSelectedAction,
  wallet,
  setOptions
}: {
  setSelectedAction: SelectedActionType;
  wallet : WalletType
  setOptions : SetActionBooleanType 
}) {

  const removeWallet = async(publicKey : string) => {
    console.log(publicKey)
    const response = await removeWalletWithPublicKey(publicKey)

    console.log(response)
    if(!response){
      console.log("Error While Deleting")
      return
    }

    setOptions(false)
  }

  return (
    <div className="relative flex w-[40rem] flex-col rounded-xl bg-[#1FB4DC] bg-clip-border text-gray-100 shadow-md">
      <div className="p-10">
        <div className="flex justify-center">
          <div className="flex flex-col items-center mb-16  w-full">
            <div className="flex items-center gap-10 mb-6 pt-2 pb-4 text-5xl font-mono w-full">
              <div
                className="hover:cursor-pointer"
                onClick={() => setSelectedAction("")}
              >
                <LuArrowLeft className="h-8 w-8 hover:text-neutral-900" />
              </div>
              <h1 className="flex items-center w-full font-mono">
                Remove Wallet
              </h1>
            </div>

            <div className="max-w-xl w-[80%] text-white font-semibold mb-8 flex flex-col justify-center">
              <div className="flex gap-4 justify-center mb-4">
                <svg
                  className="size-8 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />{" "}
                  <line x1="12" y1="9" x2="12" y2="13" />{" "}
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
             

              <h1 className="flex justify-center w-full text-3xl mb-4">
                Are you sure you want to remove public key
              </h1>
              </div>

              <h2 className="text-black text-lg font-mono">
                Removing the wallet will not delete the wallet content it will
                still be available by importing your secret
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-base font-semibold p-4 w-full gap-4">
          <button
            className="flex justify-center items-center p-3 w-1/2 bg-[#202127] text-white rounded-xl hover:bg-[#18191f]"
            onClick={() => setSelectedAction("")}
          >
            Cancel
          </button>
          <button className="flex justify-center items-center p-3 w-1/2 text-[#f94845] bg-red-200 hover:text-white rounded-xl hover:bg-red-600" onClick={() => removeWallet(wallet.publicKey)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
