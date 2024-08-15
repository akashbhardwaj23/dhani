import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { AssetComponentsType } from "@/lib/types/wallettypes";

export function Receive(
    { publicKey, setAssetsComponents }:{ publicKey: string | undefined, setAssetsComponents:(value:AssetComponentsType) => void }) {
  const qrRef = useRef(null);
  const [copied, setCopied] = useState<boolean>(false)


  useEffect(() => {
    if (publicKey) {
      const canvas = qrRef.current;
      QRCode.toCanvas(canvas, publicKey, function (error) {
        if (error) console.error(error);
        console.log("success!");
      });
    }
  }, []);

  const copy = async () => {
    setCopied(true)
    setTimeout(() => {
        setCopied(false)
    }, 5_000);
    await navigator.clipboard.writeText(publicKey || "")
  }

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
          <h1 className="text-5xl text-white">Deposit</h1>
        </div>

        <div className="flex justify-center mb-4">
            <canvas ref={qrRef} className="w-32 h-32 rounded-lg"></canvas>
        </div>

        <div className="flex justify-center mb-8 text-wrap">
            {publicKey}
        </div>

        <div className="text-wrap mb-8 flex flex-col items-center">
        <button className="flex justify-center w-1/2 mb-4 bg-[#0b1d3f] text-lg text-[#3592ff] rounded-xl font-semibold p-3 hover:bg-[#0c1b37] hover:text-[#4079d0]" onClick={copy}>
            Copy Address
          </button>
            <h2 className="max-w-lg">
                This can only receive assets in solana
            </h2>
        </div>
      </div>
    </div>
  );
}
