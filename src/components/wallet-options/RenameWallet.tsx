import { SelectedActionType } from "@/lib/types/actiontype";

export function RenameWalletAction({
  setSelectedAction,
}: {
  setSelectedAction: SelectedActionType;
}) {
  return (
    <div className="relative flex w-[40rem] flex-col rounded-xl bg-[#1FB4DC] bg-clip-border text-gray-100 shadow-md">
      <div className="p-10">
        <div>
          <div className="flex flex-col justify-between mb-16">
            <div className="flex mb-6  px-4 pt-2 pb-4 text-xl text-white w-full">
              <div
                className="hover:cursor-pointer"
                onClick={() => setSelectedAction("")}
              >
                <svg
                  className="size-8 text-red-500 hover:text-red-500/70"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <line x1="5" y1="12" x2="19" y2="12" />{" "}
                  <line x1="5" y1="12" x2="9" y2="16" />{" "}
                  <line x1="5" y1="12" x2="9" y2="8" />
                </svg>
              </div>
              <h1 className="flex justify-center items-center text-4xl w-full">
                Rename Wallet
              </h1>
            </div>

            <div className="w-full text-base text-black font-semibold mb-8">
              <input
                type="text"
                value={"Wallet 1"}
                className="w-full p-3 rounded-md bg-gray-100 mb-4 focus:outline-none focus:outline focus:outline-[#4b93f8]"
              />

              <h1 className="flex justify-center items-center">(public key)</h1>
            </div>
          </div>
          <div className="flex justify-between text-base font-semibold p-4 w-full gap-4">
            <button className="flex justify-center items-center p-3 w-1/2 bg-gray-100 text-black rounded-xl hover:bg-gray-300" onClick={() => setSelectedAction("")}>
              Cancel
            </button>
            <button className="flex justify-center items-center p-3 w-1/2 text-[#202127] bg-white rounded-xl hover:bg-gray-300">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
