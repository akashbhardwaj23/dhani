import { SelectedActionType } from "@/lib/types/actiontype";


export function RemoveWalletAction({
    setSelectedAction,
  }: {
    setSelectedAction: SelectedActionType;
  }) {
    return (
      <>
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
              <h1 className="flex justify-center items-center w-full">
                Remove Wallet
              </h1>
            </div>
  
            <div className="w-full text-white font-semibold mb-8">
              <div className="flex justify-center mb-4">
                <svg
                  className="size-12 text-red-500"
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
              </div>
  
              <div className="flex justify-center items-center mb-2 w-full">
              <h1 className="flex justify-center w-full text-3xl ">Are you sure you want to remove public key</h1>
              </div>
              <h2 className="text-[#969eae]">Removing the wallet will not delete the wallet content it will still be available by importing your secret</h2>
            </div>
          </div>
          <div className="flex justify-between text-base font-semibold p-4 w-full gap-4">
            <button className="flex justify-center items-center p-3 w-1/2 bg-[#202127] text-white rounded-xl hover:bg-[#18191f]" onClick={() => setSelectedAction("")}>
              Cancel
            </button>
            <button className="flex justify-center items-center p-3 w-1/2 text-[#f94845] bg-[#351a1f] rounded-xl hover:bg-gray-200">
              Remove
            </button>
          </div>
        </div>
      </>
    );
  }
  