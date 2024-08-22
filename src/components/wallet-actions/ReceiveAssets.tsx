import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { AssetComponentsType } from "@/lib/types/wallettypes";

export function Receive({
  publicKey,
  setAssetsComponents,
}: {
  publicKey: string | undefined;
  setAssetsComponents: (value: AssetComponentsType) => void;
}) {
  const qrRef = useRef(null);
  const [copied, setCopied] = useState<boolean>(false);

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
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5_000);
    await navigator.clipboard.writeText(publicKey || "");
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-10">
      <div className="relative flex w-[40rem] flex-col rounded-xl bg-white bg-clip-border text-black shadow-md">
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
              <h1 className="text-4xl text-black font-bold">Deposit</h1>
            </div>

            <div className="flex justify-center mb-4">
              <canvas ref={qrRef} className="w-32 h-32 rounded-lg"></canvas>
            </div>

            <div className="flex justify-center mb-8 text-wrap">
              {publicKey}
            </div>

            <div className="text-wrap mb-8 flex flex-col items-center">
              <button
                className="flex justify-center w-1/2 mb-4 bg-black text-lg text-gray-100 rounded-xl font-semibold p-3 hover:bg-black/90 hover:text-white"
                onClick={!copied ? copy : () => {

                }}
              >
                {
                  !copied ? "Copy Address" : "Copied"
                }
              </button>
              <h2 className="max-w-lg">
                This can only receive assets in solana
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
