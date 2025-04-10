import { EthereumImageUrl, SolanaImageUrl } from "@/config/assets";
import { SelectedNetworkType, WalletType } from "@/lib/types/wallettypes";
import { useStoreContext } from "@/lib/utils/store/context";
import { Dispatch, SetStateAction, useState } from "react";
import { LuCheck, LuChevronDown, LuCopy, LuCopyCheck } from "react-icons/lu";
import { SiEthereum, SiSolana } from "react-icons/si";

export function Appbar({
  onClick,
  wallet,
  selectedWallet,
}: {
  onClick: () => void;
  wallet: WalletType | undefined;
  selectedWallet: number;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const [network, setNetwork] = useState<boolean>(false);

  const {selectedNetwork, setSelectedNetwork} = useStoreContext()


  const copy = async () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5_000);
    await navigator.clipboard.writeText(wallet?.publicKey || "");
  };

  return (
    <div className="w-full p-8 flex justify-between relative">
      <div className="flex justify-center items-center">
        <img
          src={"/icon.png"}
          alt="icon"
          className="w-12 h-12 contrast-200 drop-shadow-blue-shadow"
        />
      </div>

      <div className="flex justify-center items-center ">
        <div className="w-[42rem] grid grid-cols-5 h-full items-center bg-[#141718] rounded-3xl  border border-[#37383d] shadow-sm shadow-[#1FB4DC]">
          <div
            className="p-2 pl-12 rounded-l-3xl float-left col-span-1 hover:bg-[#0e0f14] hover:cursor-pointer"
            onClick={() => setNetwork((prev) => !prev)}
          >
            {selectedNetwork === "SOLANA" ? <SiSolana className="w-6 h-6 contrast-200" /> : <SiEthereum className="w-6 h-6 contrast-200" />}
          </div>
          <div
            className="flex border-x-2 border-[#37383d] h-full justify-center items-center col-span-3 text-base text-white font-semibold hover:bg-[#0e0f14] hover:cursor-pointer"
            onClick={onClick}
          >
            <span className="mr-6 text-lg">Wallet {selectedWallet}</span>
            <LuChevronDown />
          </div>
          <div
            className="p-2 h-full flex justify-center items-center rounded-r-3xl col-span-1 hover:bg-[#0e0f14] hover:cursor-pointer"
            onClick={copy}
          >
            {copied ? (
              <LuCopyCheck className="w-6 h-6 text-blue-600/80" />
            ) : (
              <LuCopy className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-white font-mono font-semibold rounded-full p-2 bg-[#1A8DDD] h-10 w-10 shadow-md">
        A
      </div>

      {network && <NetworkModelAppbar className="w-40 h-20" setNetwork={setNetwork} selectedNetwork={selectedNetwork} setSelectedNetwork ={setSelectedNetwork} />}
    </div>
  );
}

function NetworkModelAppbar({ 
   className,
   setNetwork,
   selectedNetwork,
   setSelectedNetwork
  }: 
   { className: string, 
    setNetwork : Dispatch<SetStateAction<boolean>>
    selectedNetwork : SelectedNetworkType,
    setSelectedNetwork : Dispatch<SetStateAction<SelectedNetworkType>>
  
  }) {

  return (
    <div
      className={`${className} rounded-lg left-[28rem] top-20 bg-black absolute z-50`}
    >
      <div className="w-full flex flex-col items-center">
        <div
          className="w-full p-2 flex items-center rounded-t-lg hover:bg-neutral-800 hover:cursor-pointer"
          onClick={() => {
            setSelectedNetwork("SOLANA")
            setNetwork(false)
          }}
        >
          <SiSolana className="w-6 h-6 mr-4" />
          <h1 className="text-base font-mono">Solana</h1>
          {selectedNetwork === "SOLANA" && (
            <div className="flex justify-end w-full">
              <LuCheck className="text-red-600" />
            </div>
          )}
        </div>

        <div
          className="w-full p-2 flex items-center rounded-b-lg hover:bg-neutral-800 hover:cursor-pointer"
          onClick={() => {
            setSelectedNetwork("ETHEREUM");
            setNetwork(false)
          }}
        >
          <SiEthereum className="w-4 h-4 mr-4" />
          <h1 className="text-base font-mono">Ethereum</h1>
          {selectedNetwork === "ETHEREUM" && (
            <div className="flex justify-end w-full">
             <LuCheck className="text-red-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
