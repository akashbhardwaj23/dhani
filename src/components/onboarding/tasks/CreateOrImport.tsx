"use client";

export function CreateOrImportWallet({
  onNext 
}: {
  onNext : (data : any) => any
}) {
  return (
      <div className="max-w-xl w-full flex h-full items-center flex-col">
        <div className="mb-4 p-2">
          <img src="icon.png" alt="" className="w-24 h-24" />
        </div>
        <div className="mb-40">
          <h1 className="text-white text-4xl font-semibold mb-4 tracking-tight">
            Welcome back To Wallet
          </h1>
          <h2 className="text-[#969fa5] text-base font-medium flex justify-center tracking-tight">
            Lets get started.
          </h2>
        </div>
        <button
          className={`bg-white text-black px-4 py-3 text-base font-semibold rounded-xl mb-4 w-1/2 tracking-tight`}
          onClick={() => onNext({action : "create"})}
        >
          Create a Wallet
        </button>
        <button
          className={`bg-[#202127] text-white px-4 py-3 text-base font-semibold rounded-xl mb-2 w-1/2 tracking-tight`}
          onClick={() => onNext({action : "import"})}
        >
          Import Wallet
        </button>
        {/* <PrimaryButton className1="bg-white text-black" onClick={() => {}}></PrimaryButton>
            <PrimaryButton className1="bg-gray-600 text-white" onClick={() => {}}>Import Wallet</PrimaryButton> */}
      </div>
  );
}
