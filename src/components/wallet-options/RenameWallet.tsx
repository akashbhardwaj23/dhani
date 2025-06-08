import { SelectedActionType } from "@/lib/types/actiontype";
import { LuArrowLeft } from "react-icons/lu";

export function RenameWalletAction({
  setSelectedAction,
}: {
  setSelectedAction: SelectedActionType;
}) {
  return (
    <div className="relative flex w-[32rem] flex-col rounded-[20px] bg-gradient-to-br from-white to-neutral-200 bg-clip-border text-gray-100 shadow-md">
      <div className="p-8 md:p-10">
        <div>
          <div className="flex flex-col justify-between mb-4 md:mb-10">
            <div className="flex items-center gap-8 pt-2 pb-4 mb-10 w-full">
              <div
                className="hover:cursor-pointer"
                onClick={() => setSelectedAction("")}
              >
                <LuArrowLeft className="size-5 md:size-7 text-neutral-800 hover:text-neutral-700" />
              </div>
              <h1 className="flex justify-center items-center font-semibold font-mono text-neutral-800 tracking-tight text-2xl md:text-4xl w-full">
                Rename Wallet
              </h1>
            </div>

            <div className="w-full text-base text-black font-semibold mb-8">
              <input
                type="text"
                value={"Wallet 1"}
                className="w-full p-3 rounded-md bg-neutral-200 mb-4 focus:outline-none focus:outline focus:outline-[#4b93f8]"
              />

              <h1 className="flex justify-center items-center">(public key)</h1>
            </div>
          </div>
          <div className="flex justify-between text-base font-semibold p-4 w-full gap-4">
            <button className="flex justify-center items-center p-3 w-1/2 bg-gradient-to-r from-neutral-200 to-neutral-300 text-black rounded-xl hover:bg-gray-300" onClick={() => setSelectedAction("")}>
              Cancel
            </button>
            <button className="flex justify-center items-center p-3 w-1/2 text-[#202127] bg-gradient-to-r from-white to-neutral-50 rounded-xl hover:bg-gray-300">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
