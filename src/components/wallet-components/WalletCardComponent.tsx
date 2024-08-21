import {
  EthereumImageUrl,
  SolanaImageUrl,
} from "@/config/assets";
import { SetActionBooleanType } from "@/lib/types/actiontype";
import { CopyWallet, IswalletsPageType, WalletType } from "@/lib/types/wallettypes";
import { Dispatch, SetStateAction, useState } from "react";
import { SelectedNetworkType } from "@/lib/types/wallettypes";
import { useRecoilState } from "recoil";
import { selectedNetworkState } from "@/lib/utils/state/recoil";


export function WalletCard({
  setModel,
  setIsWalletsPage,
  wallets,
  selectedWallet,
  setSellectedWallet,
  setOptions,
}: {
  setIsWalletsPage: Dispatch<SetStateAction<IswalletsPageType>>;
  setModel: SetActionBooleanType;
  wallets: WalletType[] | null;
  setSellectedWallet: Dispatch<SetStateAction<number>>;
  selectedWallet: number;
  setOptions: SetActionBooleanType;
}) {
  const [copied, setCopied] = useState<CopyWallet | undefined>();
  const [network, setNetwork] = useState<boolean>(false);

    const [selectedNetwork, setSelectedNetwork] = useRecoilState(selectedNetworkState)

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
      (wallet) => wallet.id === walletId
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
            <svg
              className="h-8 w-8 text-neutral-100 hover:text-neutral-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
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
            <img src={selectedNetwork === "Solana" ? SolanaImageUrl : EthereumImageUrl} alt="sol" className="w-8 h-8 contrast-200 mr-2" />
            <h1 className="text-base font-semibold mr-2">{selectedNetwork === "Solana" ? "Solana" : "Ethereum"}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#75798a"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-y-auto bg-green-800 w-full h-80">
          {wallets?.map((wallet) => (
            <div
              key={wallet.id}
              className={`bg-gray-100 p-6 flex justify-between items-center relative rounded-md  mb-8 ${`
            selectedWallet === wallet.id ? "border-2 border-[#4c94ff]" : ""`} 
            hover:bg-gray-200 hover:cursor-pointer`}
            >
              <div
                className="flex items-center"
                onClick={() => {
                  setSellectedWallet(wallet?.id);
                  setIsWalletsPage("wallet");
                }}
              >
                <img
                  src={SolanaImageUrl}
                  alt="sol"
                  className="h-10 w-10 contrast-200 mr-4"
                />
                <div>
                  <h1 className="text-black text-xl font-semibold">
                    Wallet {wallet.id}
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
                <div className="p-2 rounded-full hover:bg-black right-20 absolute" onClick={() => copyPublicKey(selectedWallet)}>
                  {copied?.value && copied.walletId === wallet.id ? (
                    <svg
                      className="size-8 text-red-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      className="size-8 text-neutral-900 hover:text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                    </svg>
                  )}
                </div>
                <div
                  className="p-2 rounded-full hover:bg-black absolute right-4"
                  onClick={() => {
                    setSellectedWallet(wallet.id);
                    setOptions(true);
                  }}
                >
                  <svg
                    className="size-8 text-neutral-900 hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-[#4c94ff] font-bold text-base flex items-center gap-2 hover:cursor-pointer"
          onClick={() => setModel(true)}
        >
          <div className="flex justify-center items-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <span className="flex justify-center items-center">
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
                setSelectedNetwork("Solana")
                setNetwork(false)
              }}
            >
              <img src={SolanaImageUrl} alt="sol" className="w-6 h-6 mr-4" />
              <h1 className="text-base font-mono">Solana</h1>
              {selectedNetwork === "Solana" && (
                <div className="flex justify-end w-full">
                  <svg
                    className="size-6 text-red-500 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div
              className="w-full p-2 flex items-center rounded-b-lg hover:bg-neutral-800 hover:cursor-pointer"
              onClick={() => {
                setSelectedNetwork("Ethereum");
                setNetwork(false)
              }}
            >
              <img src={EthereumImageUrl} alt="eth" className="w-6 h-6 mr-4" />
              <h1 className="text-base font-mono">Ethereum</h1>
              {selectedNetwork === "Ethereum" && (
                <div className="flex justify-end w-full">
                  <svg
                    className="size-6 text-red-500 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
    )
}
