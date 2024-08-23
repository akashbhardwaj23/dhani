"use client"
import { SolanaImageUrl, USDCImageUrl } from "@/config/assets";
import { AssetComponentsType, WalletType } from "@/lib/types/wallettypes";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export function Card() {

  const router = useRouter()

  return (
    <div className="relative flex flex-col mt-6 text-white bg-[#161819] shadow-md bg-clip-border rounded-xl w-2/3">
      <div className="p-10">
        <h1 className="block mb-2 font-mono text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Your Digital Crypto Wallet For EveryThing
        </h1>
        <p className="block font-normal text-base antialiased leading-relaxed text-inherit">
          Join The Sol Community. Earn and Transfer Assets made Easy
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-[#1A8DDD] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => router.push("https://solana.com/community")}
        >
          Join Now
        </button>
      </div>
    </div>
  );
}

export function MyAssetsCard({
  wallet,
  onClick,
  setAssetsComponents
}: {
  wallet : WalletType | undefined,
  onClick : () => void
  setAssetsComponents : Dispatch<SetStateAction<AssetComponentsType>>
}) {

  const [copied, setCopied] = useState<boolean>(false)

  const copy = async () => {
    setCopied(true);
    
    setTimeout(() => setCopied(false), 5000);

    await navigator.clipboard.writeText(wallet?.publicKey || "")
  }


  return (
    <div className="relative flex flex-col mt-6 text-gray-50 bg-[#1A8DDD] shadow-md bg-clip-border rounded-2xl w-[92%]">
      <div className="p-10">
        <div className="w-full col-span-1">
          <h1 className="block mb-1 font-mono text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Assets
          </h1>
          <h2 className="flex mb-2 text-lg antialiased font-light leading-snug tracking-normal text-blue-gray-900">
            <span className="mr-2">{wallet?.publicKey.slice(0, 6)}...</span>
            <span className="flex justify-center items-center hover:cursor-pointer" onClick={copy}>
              {!copied ? (<svg
                className="size-4 text-gray-100 hover:text-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />{" "}
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>) : (<span className="text-sm font-semibold">
                copied
                </span>)}
            </span>
          </h2>
         <div className="w-full flex justify-between items-center">
         <p className="block font-mono text-5xl antialiased font-bold leading-snug text-inherit">
            <span className="mr-2">$</span>
            <span className="mr-4">{wallet?.usdcBalance}</span>
            
          </p>
          <span onClick={onClick}><svg className="size-8 text-neutral-100 active:animate-ping"  width="24" height="24" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />  <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3-3l3-3" /></svg></span>
         </div>
        </div>
      </div>
      <div className="flex justify-between p-10 pt-0 w-full">
        <button
          className="flex justify-center items-center font-mono font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg py-3 px-8 rounded-md bg-[#3e99e3]/80 text-white shadow-md shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/60 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => setAssetsComponents("send")}
        >
          <span className="mr-2">
            <svg
              className="size-6 text-gray-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <line x1="17" y1="17" x2="7" y2="7" />{" "}
              <polyline points="7 17 7 7 17 7" />
            </svg>
          </span>
          <span>Send</span>
        </button>
        <button
          className="flex justify-center items-center font-mono font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg py-3 px-8 rounded-md bg-[#3e99e3]/80 text-white shadow-md shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/60 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => setAssetsComponents('receive')}
        >
          <span className="mr-2">
            <svg
              className="size-6 text-gray-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <line x1="7" y1="7" x2="17" y2="17" />{" "}
              <polyline points="17 7 17 17 7 17" />
            </svg>
          </span>
          <span>Receive</span>
        </button>
        <button
          className="flex justify-center items-center font-mono font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg py-3 px-8 rounded-md bg-[#3e99e3]/80 text-white shadow-md shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/60 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => setAssetsComponents('swap')}
        >
          <span className="mr-2">
            <svg
              className="size-6 text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </span>
          <span>Swap</span>
        </button>
      </div>
    </div>
  );
}

export function AssetsCard({
  wallet
}: {
  wallet : WalletType | undefined
}) {
  return (
    <div className="relative flex flex-col mt-2 text-gray-50 bg-[#1A8DDD] shadow-md bg-clip-border rounded-2xl w-5/6">
      <div className="p-4 px-8">
        <div className="w-full col-span-1">
          <div className="flex mb-1 font-mono text-4xl antialiased font-semibold leading-snug tracking-normal justify-between text-blue-gray-900">
            <div className="w-full flex items-center">
              <img src={SolanaImageUrl} className="w-16 h-16 mr-8" />
              <div className="flex flex-col">
                <h1 className="block font-mono text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Solana
                </h1>
                <h2 className="block mb-1 font-mono text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {wallet?.assetBalance} SOL
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="block font-mono text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {" "}
                ${wallet?.assetBalance}
              </h1>
              <h2 className="font-mono text-base flex justify-end antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                +3.37%
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full boder border-[#eaeaea]">

        </div>

        <div className="w-full col-span-1">

        <div className="flex mb-1 font-mono text-4xl antialiased font-semibold leading-snug tracking-normal justify-between text-blue-gray-900">
            <div className="w-full flex items-center">
              <img src={USDCImageUrl} className="w-16 h-16 mr-8" />
              <div className="flex flex-col">
                <h1 className="block font-mono text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  USDC
                </h1>
                <h2 className="block mb-1 font-mono text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {wallet?.usdcBalance} usdc
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="block font-mono text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {" "}
                ${wallet?.usdcBalance}
              </h1>
              <h2 className="font-mono text-base flex justify-end antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                +3.37%
              </h2>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


