import { SolanaImageUrl } from "@/config/assets";

export function AccountName({ onNext }: { onNext: (data: any) => any }) {
  return (
    <div className="max-w-xl w-full flex h-full items-center flex-col">
      <div className="mb-8">
        <h1 className="text-4xl text-white font-semibold mb-6 tracking-normal flex justify-center">
          Select Network
        </h1>
        <h2 className="text-[#969fa5] text-base font-medium tracking-normal">
          <span className="flex justify-center">
            We supports one blockchains.
          </span>
          <span>Which do you want to use? You can add more later.</span>
        </h2>
      </div>
      <input
        type="text"
        className="px-4 py-3 w-full rounded-xl bg-[#202127] mb-4 placeholder:text-[#686a79] text-white placeholder:font-semibold hover:border hover:border-blue-700/80"
        placeholder="Select Networks"
      />

      <div className="border-t-2 border-[#202127] w-full pt-4">
        <button
          value={"sol"}
          className="flex items-center p-4 bg-[#202127] text-white font-semibold w-full rounded-xl hover:border-2 focus:border-blue-700/80"
          onClick={(e: any) => onNext({ network: e.target.value })}
        >
          <img
            src={SolanaImageUrl}
            alt="solana-icon"
            className="w-8 h-8 mr-4"
          />
          <span>Solana</span>
        </button>
      </div>
    </div>
  );
}
