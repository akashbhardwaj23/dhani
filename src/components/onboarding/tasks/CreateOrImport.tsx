"use client";

import Image from "next/image";

export function CreateOrImportWallet({
  onNext 
}: {
  onNext : (data : any) => any
}) {
  return (
      <div className="max-w-4xl md:max-w-xl w-full flex h-full items-center flex-col">
        <div className="mb-4 p-2">
          <Image src="/icon.png" width={500} height={500} alt="logo" className="w-24 h-24" />
        </div>
        <div className="mb-10 md:mb-20">
          <h1 className="text-white text-sm md:text-4xl flex justify-center font-semibold mb-2 md:mb-4 tracking-tight">
            Welcome back To Wallet
          </h1>
          <h2 className="text-[#969fa5] text-xs md:text-base font-medium flex justify-center tracking-tight">
            Lets get started.
          </h2>
        </div>
        <button
          className={`bg-white w-full text-black px-4 py-3 text-base font-semibold rounded-xl mb-4 md:w-1/2 cursor-pointer tracking-tight`}
          onClick={() => onNext({action : "create"})}
        >
          Create a Wallet
        </button>
        <button
          className={`bg-[#202127] text-white w-full px-4 py-3 text-base font-semibold rounded-xl mb-2 md:w-1/2 cursor-pointer tracking-tight`}
          onClick={() => onNext({action : "import"})}
        >
          Import Wallet
        </button>
        {/* <PrimaryButton className1="bg-white text-black" onClick={() => {}}></PrimaryButton>
            <PrimaryButton className1="bg-gray-600 text-white" onClick={() => {}}>Import Wallet</PrimaryButton> */}
      </div>
  );
}
