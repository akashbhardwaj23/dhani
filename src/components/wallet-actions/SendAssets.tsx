import { useState } from "react";
import { AssetComponentsType } from "@/lib/types/wallettypes";
import { SolanaImageUrl } from "@/config/assets";

export function SendAssets({
  setAssetsComponents,
}: {
  setAssetsComponents: (value: AssetComponentsType) => void;
}) {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [senderPublicKey, setSenderPublicKey] = useState("")
    const [amount, setAmount] = useState("");

    const sendAssets = async () => {
        // do something here
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
          <h1 className="text-5xl text-white">Send</h1>
        </div>
      </div>

      <div className="w-full mb-8">
        <select className="p-4 w-full rounded-lg bg-[#202127] text-[#4b93f8] font-bold" onChange={(e:any) => setSelectedAsset(e.target.value)}>
            <option value={""} className="font-semibold p-3 text-[#727484]" selected>Select the Network</option>
            <option value="sol" className="font-semibold p-3"><img src={SolanaImageUrl} alt="sol" className="w-8 h-8" />Solana</option>
        </select>
      </div>

      <div className="w-full mb-4">
      <h1 className="text-base font-semibold text-[#727484] mb-2 ml-1">Public Address</h1>
        <input type="text" className="p-3 w-full bg-[#202127] rounded-lg mb-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]" placeholder="Enter Address" value={senderPublicKey} onChange={(e:any) => setSenderPublicKey(e.target.value)} />
      </div>

      <div className="w-full mb-8">
        <h1 className="text-base font-semibold text-[#727484] mb-2 ml-1">Amount</h1>
        <input type="text" className="p-4 w-full bg-[#202127] rounded-lg mb-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]" placeholder="Enter Address" value={amount} onChange={(e:any) => setAmount(e.target.value)} />
      </div>

      <div className="w-full">
      <button className="flex justify-center w-full bg-white text-lg text-[#202127] rounded-lg font-semibold p-3 hover:bg-slate-100" onClick={sendAssets}>
            Review
          </button>
      </div>
    </div>
  );
}
