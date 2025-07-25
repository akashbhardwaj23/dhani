import { useState } from "react";
import { AssetComponentsType } from "@/lib/types/wallettypes";
import {
  Transaction,
  VersionedTransaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { NATIVE_MINT } from "@solana/spl-token";
import axios from "axios";
import { connection } from "../../server/connection";
import { API_URLS } from "@raydium-io/raydium-sdk-v2";

export function Swap({
  setAssetsComponents,
}: {
  setAssetsComponents: (value: AssetComponentsType) => void;
}) {
  let [inputmintValue, setInputmintValue] = useState<string>("");
  let [outputmintValue, setOutputmintValue] = useState<number>(0);
  let [inputmint, setInputmint] = useState<string>("sol");
  let [outputmint, setOutputmint] = useState<string>("usdc");
  const [isQuote, setIsQuote] = useState(true);

  let inputMint = "So11111111111111111111111111111111111111112";
  let outputMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  const slippageBps = 50;

  const handleQuote = async() => {
    if(!Number(inputmintValue)){
      console.log("Put a Value")
      return
    }

    try {
      const amount = Number(inputmintValue) * LAMPORTS_PER_SOL;
      const response = await axios.get(
        `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
      );
      console.log(response.data);
      const outputValue = response.data.outAmount / Math.pow(10, 6);
      setOutputmintValue(outputValue);
      setIsQuote(false)
    } catch (error) {
      console.log(error);
      setIsQuote(false)
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-full p-10">
      <div className="relative flex w-[45rem] flex-col rounded-xl bg-white bg-clip-border text-black shadow-md">
        <div className="p-8">
          <div className="w-full flex justify-center flex-col">
            <div className="" onClick={() => setAssetsComponents("home")}>
              <svg
                className="size-8 text-neutral-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <div className="flex justify-center mb-8">
              <h1 className="text-5xl text-black font-bold">Swap</h1>
            </div>
            <div className="relative w-full mb-8">
              <h1 className="text-lg text-black mb-2 flex justify-center font-mono">
                Sending
              </h1>

              <input
                type="text"
                className="py-10 px-4 border-2 border-[#202127] rounded-lg w-full bg-transparent text-black text-lg mb-2 font-semibold focus:outline-none focus:border focus:outline-2 focus:outline-[#4b93f8]"
                placeholder="0"
                value={inputmintValue}
                onChange={(e: any) =>{
                  setIsQuote(true)
                  setInputmintValue(e.target.value)
                }}
              />
              <div className="absolute border border-[#202127] rounded-lg top-16 right-4">
                <select
                  className="p-3 bg-transparent w-36"
                  onChange={(e) => setInputmint(e.target.value)}
                >
                  <option value="sol" className="p-4" selected>
                    SOLANA
                  </option>
                </select>
              </div>

              <div
                className="flex justify-center absolute left-[45%] top-[40%]"
                onClick={() => {
                  let tempInputmintValue = inputmintValue;
                  setInputmintValue(String(outputmintValue));
                  setOutputmintValue(Number(tempInputmintValue));
                }}
              >
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
                className="py-10 px-4 border-2 border-[#202127] rounded-lg w-full bg-transparent text-black mb-2 font-semibold focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]"
                placeholder="0"
                disabled
                value={outputmintValue}
                onChange={(e: any) => setOutputmintValue(e.target.value)}
              />

              <div className="absolute border border-[#202127] rounded-lg top-44 right-4">
                <select
                  className="p-3 bg-transparent w-36"
                  onChange={(e) => setOutputmint(e.target.value)}
                >
                  <option value="usdc" selected>
                    USDC
                  </option>
                  <option value="eth">ETHEREUM</option>
                  <option value="usdt">USDT</option>
                  <option value="sol">SOLANA</option>
                </select>
              </div>

              <h1 className="text-lg text-black font-mono mb-2 flex justify-center">
                Receiving
              </h1>
            </div>

            <div className="w-full">
              {isQuote ? (
                <button className="flex justify-center w-full bg-black text-lg text-white rounded-lg font-semibold p-3 hover:bg-black/90" onClick={handleQuote}>
                  Get Quote
                </button>
              ) : (
                <button className="flex justify-center w-full bg-black text-lg text-white rounded-lg font-semibold p-3 hover:bg-black/90">
                  Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
