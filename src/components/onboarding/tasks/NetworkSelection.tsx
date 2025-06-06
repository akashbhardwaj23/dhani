import { SiSolana, SiEthereum } from "react-icons/si"


type BlockChains = "SOLANA" | "ETHEREUM" ;

export function NetworkSelection({ onNext }: { onNext: (name: any) => any }) {

  const blockchains: BlockChains[] = ["SOLANA", "ETHEREUM"];

  return (
    <div className="max-w-xl w-full flex h-full items-center flex-col">
      <div className="mb-8">
        <h1 className="text-xl md:text-4xl text-white font-semibold mb-2 md:mb-6 tracking-normal flex md:justify-center">
          Select Network
        </h1>
        <h2 className="text-[#969fa5] text-xs md:text-base font-medium tracking-normal">
          <span className="flex md:justify-center">
            We supports two blockchains.
          </span>
          <span>Which do you want to use? You can add more later.</span>
        </h2>
      </div>
      <input
        type="text"
        className="px-4 py-3 w-full rounded-xl bg-[#202127] mb-4 placeholder:text-[#686a79] text-white placeholder:font-semibold hover:border hover:border-blue-700/80"
        placeholder="Select Networks"
      />
      {blockchains.map(blockchain => (
         <div key={blockchain} className="border-t-2 border-[#202127] w-full pt-4">
         <button
           value={blockchain}
           className="flex items-center p-4 bg-[#202127] text-white font-semibold w-full rounded-xl hover:border-2 focus:border-blue-700/80"
           onClick={(e: any) => onNext(e.target.value)}
         >
           {blockchain === "SOLANA" ? <SiSolana className="w-8 h-8 mr-4 text-blue-600" /> : <SiEthereum className="w-8 h-8 mr-4" />}
           <span>{blockchain}</span>
         </button>
       </div>
      ))}
    </div>
  );
}
