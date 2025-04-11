import { SetActionBooleanType } from "@/lib/types/actiontype";
import { CopyWallet, IswalletsPageType, WalletType } from "@/lib/types/wallettypes";
import { Dispatch, SetStateAction, useState } from "react";
import { SelectedNetworkType } from "@/lib/types/wallettypes";
// import { useStoreContext } from "@/lib/utils/store/context";
import { SiEthereum, SiSolana } from "react-icons/si";
import { LuArrowLeft, LuCheck, LuChevronDown, LuCirclePlus, LuCopy, LuCopyCheck, LuMenu } from "react-icons/lu"
import { useWallets } from "@/hooks/useWallets";
import { useStoreContext } from "@/hooks/useWallets";


export function WalletCard({
  setModel,
  setIsWalletsPage,
  setSellectedWallet,
  setOptions,
}: {
  setIsWalletsPage: Dispatch<SetStateAction<IswalletsPageType>>;
  setModel: SetActionBooleanType;
  setSellectedWallet: Dispatch<SetStateAction<number>>;
  setOptions: SetActionBooleanType;
}) {
  const [copied, setCopied] = useState<CopyWallet | undefined>();
  const [network, setNetwork] = useState<boolean>(false);
  const {wallets} = useWallets()

    const {selectedNetwork, setSelectedNetwork} = useStoreContext()

    console.log(copied);
    console.log(wallets)

  const copyPublicKey = async (walletId: number) => {
    setCopied({
      walletId,
      value: true,
    });
    setTimeout(
      () =>
        setCopied((copied) => {
          return {
            walletId: copied?.walletId || 1,
            value: false,
          };
        }),
      5_000
    );
    const walletPublicKey = wallets?.filter(
      (wallet) => wallet.walletNumber === walletId
    )[0].publicKey;
    await navigator.clipboard.writeText(walletPublicKey || "");
  };

  return (
    <div className="relative flex w-[40rem] flex-col rounded-xl bg-[#1FB4DC] bg-clip-border text-gray-100 shadow-md">
      <div className="p-8">
        <div className="mb-4 flex items-center">
          <div
            className="flex hover:cursor-pointer"
            onClick={() => setIsWalletsPage("wallet")}
          >
            <LuArrowLeft className="w-10 h-10 hover:text-neutral-900" />
          </div>

          <div className="flex w-full justify-center">
            <h1 className="flex justify-center font-mono text-5xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Wallet
            </h1>
          </div>
        </div>

        <div className="p-2 flex justify-center mb-4">
          <div
            className="flex items-center rounded-full border text-black border-black bg-white w-auto p-2 hover:bg-[#14151b] hover:text-white hover:cursor-pointer"
            onClick={() => setNetwork((prev => !prev))}
          >
            {selectedNetwork === "SOLANA" ? <SiSolana className="w-6 h-6 contrast-200 mr-2" /> : <SiEthereum className="w-6 h-6 contrast-200 mr-2" />}
            <h1 className="text-base font-semibold mr-2">{selectedNetwork === "SOLANA" ? "Solana" : "Ethereum"}</h1>
            <LuChevronDown className="w-4 h-4" />
          </div>
        </div>

        <div className="overflow-y-auto w-full h-80">
          {wallets?.map((wallet) => (
            <>
              {selectedNetwork === wallet.network ? (
                <>
                {
                  wallet.publicKey ? (<div
                    key={wallet.walletNumber}
                    className={`bg-gray-100 p-6 flex justify-between items-center relative rounded-md  mb-8 ${`
                  selectedWallet === wallet.id ? "border-2 border-[#4c94ff]" : ""`} 
                  hover:bg-gray-200 hover:cursor-pointer`}
                  >
                    <div
                      className="flex items-center"
                      onClick={() => {
                        setSellectedWallet(wallet?.walletNumber);
                        setIsWalletsPage("wallet");
                      }}
                    >
      
                      {selectedNetwork === "SOLANA" ? <SiSolana className="h-10 w-10 contrast-200 mr-4 text-black" /> : <SiEthereum className="h-10 w-10 contrast-200 mr-4 text-black" />}
                      <div>
                        <h1 className="text-black text-xl font-semibold">
                          Wallet {wallet.walletNumber}
                        </h1>
                        <h2 className="text-[#969faf] text-base font-semibold">
                          {wallet.publicKey.slice(0, 4)}...
                          {wallet.publicKey.slice(
                            wallet.publicKey.length - 4,
                            wallet.publicKey.length
                          )}
                        </h2>
                      </div>
                    </div>
      
                    <div className="flex items-center">
                      <div className="p-2 rounded-full text-black hover:bg-black hover:text-white right-20 absolute" onClick={() => copyPublicKey(wallet.walletNumber)}>
                        {copied?.value && copied.walletId === wallet.walletNumber ? (
                          <LuCopyCheck className="w-6 h-6" />
                        ) : (
                          <LuCopy className="w-6 h-6" />
                        )}
                      </div>
                      <div
                        className="p-2 rounded-full text-black hover:bg-black hover:text-white absolute right-4"
                        onClick={() => {
                          setSellectedWallet(wallet.walletNumber);
                          setOptions(true);
                        }}
                      >
                        <LuMenu className="w-6 h-6" />
                      </div>
                    </div>
                  </div>) : (
                    <div className="">
                      whats up
                    </div>
                  )
                }
                </>
              ) : null}
            </>
          ))}
        </div>

        <div
          className="text-[#4c94ff] font-bold text-base flex items-center gap-2 hover:cursor-pointer hover:text-gray-200"
          onClick={() => setModel(true)}
        >
          <div className="flex justify-center text-white items-center h-full">
          <LuCirclePlus />
          </div>
          <span className="flex justify-center items-center text-white">
            Add new solana wallet
          </span>
        </div>
      </div>

      {network && (
        <NetworkModel className="w-40 h-20" selectedNetwork={selectedNetwork} setNetwork={setNetwork} setSelectedNetwork={setSelectedNetwork} />
      )}
    </div>
  );
}


function NetworkModel({
    className,
    selectedNetwork,
    setNetwork,
    setSelectedNetwork
}: {
    className : string
    selectedNetwork : SelectedNetworkType;
    setNetwork : Dispatch<SetStateAction<boolean>>;
    setSelectedNetwork : Dispatch<SetStateAction<SelectedNetworkType>>
}){
    return (
        <div className={`${className} rounded-lg left-64 top-44 bg-black absolute`}>
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
                  <LuCheck className="text-red-600 ml-2" />
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
              <SiEthereum className="w-4 h-4 mr-2" />
              <h1 className="text-base font-mono">Ethereum</h1>
              {selectedNetwork === "ETHEREUM" && (
                <div className="flex justify-end w-full">
                  <LuCheck className="text-red-600 ml-2" />
                </div>
              )}
            </div>
          </div>
        </div>
    )
}
