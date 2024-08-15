import { useState } from "react";
import { AssetComponentsType } from "@/lib/types/wallettypes";

export function Swap({
    setAssetsComponents
}: {
    setAssetsComponents : (value:AssetComponentsType) => void
}) {
  let [inputmintValue, setInputmintValue] = useState<number>(0);
  let [outputmintValue, setOutputmintValue] = useState<number>(0);
  let [inputmint, setInputmint] = useState<string>("sol")
  let [outputmint, setOutputmint] = useState<string>("usdc")
  console.log(inputmintValue)
  console.log(outputmintValue)
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center flex-col">
        <div className="" onClick={() => setAssetsComponents("home")}>
          <svg
            className="size-8 text-neutral-500 hover:animate-bounce hover:cursor-pointer"
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
        <div className="flex justify-center mb-8">
          <h1 className="text-5xl text-white">Swap</h1>
        </div>
        <div className="relative w-full mb-8">
          <h1 className="text-lg text-white mb-2 flex justify-center">
            Sending
          </h1>

          <input
            type="text"
            className="p-6 border-2 border-[#202127] rounded-lg w-full bg-transparent text-white mb-2 font-semibold focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]"
            placeholder="0"
            value={inputmintValue}
            onChange={(e: any) => setInputmintValue(e.target.value)}
          />
          <div className="absolute border border-[#202127] rounded-lg top-12 right-4">
                <select className="p-3 bg-transparent w-36"  onChange={(e) => setInputmint(e.target.value)}>
                    <option value="sol" className="p-4" selected>SOLANA</option>
                </select>
          </div>


        
          <div className="flex justify-center absolute left-[45%] top-[38%]" onClick={() => {
            let tempInputmintValue = inputmintValue;
            setInputmintValue(outputmintValue);
            setOutputmintValue(tempInputmintValue);
          }}>
            <svg
              className="size-12 text-red-500 p-2 rounded-full border border-[#202127]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </div>



          <input
            type="text"
            className="p-6 border-2 border-[#202127] rounded-lg w-full bg-transparent text-white mb-2 font-semibold focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]"
            placeholder="0"
            value={outputmintValue}
            onChange={(e: any) => setOutputmintValue(e.target.value)}
          />

              <div className="absolute border border-[#202127] rounded-lg top-[8.2rem] right-4">
                <select className="p-3 bg-transparent w-36" onChange={(e) => setOutputmint(e.target.value)}>
                    <option value="usdc" selected>USDC</option>
                    <option value="eth">ETHEREUM</option>
                    <option value="usdt">USDT</option>
                    <option value="sol">SOLANA</option>

                </select>
          </div>


          <h1 className="text-lg text-white mb-2 flex justify-center">
            Receiving
          </h1>
        </div>

        <div className="w-full">
          <button className="flex justify-center w-full bg-white text-lg text-[#202127] rounded-lg font-semibold p-3">
            Review
          </button>
        </div>
      </div>
    </div>
  );
}
