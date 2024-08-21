import { SolanaImageUrl } from "@/config/assets";
import { SetActionBooleanType } from "@/lib/types/actiontype";
import { WalletType } from "@/lib/types/wallettypes";
import { Dispatch, SetStateAction, useState } from "react";

interface CopyWallet {
  walletId: number;
  value: boolean;
}

export function WalletCard({
  setModel,
  setIsWalletsPage,
  wallets,
  selectedWallet,
  setSellectedWallet,
  setOptions,
}: {
  setIsWalletsPage: SetActionBooleanType;
  setModel: SetActionBooleanType;
  wallets: WalletType[] | null;
  setSellectedWallet: Dispatch<SetStateAction<number>>;
  selectedWallet: number;
  setOptions: SetActionBooleanType;
}) {
  const [copied, setCopied] = useState<CopyWallet | undefined>();

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
    <div className="relative flex w-[40rem] flex-col rounded-xl bg-[#1A8DDD] bg-clip-border text-gray-100 shadow-md">
      <div className="p-10">
        <div className="mb-4 flex items-center">
          <div
            className="flex hover:cursor-pointer"
            onClick={() => setIsWalletsPage(false)}
          >
            <svg
              className="h-8 w-8 text-neutral-100 hover:text-neutral-400"
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
          <div className="flex items-center rounded-full border text-black border-black bg-white w-auto p-2 hover:bg-[#14151b] hover:text-white hover:cursor-pointer">
            <img src={SolanaImageUrl} alt="sol" className="w-8 h-8 mr-2" />
            <h1 className="text-base font-semibold mr-2">Solana</h1>
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

        <div className="w-full overflow-auto">
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
                  setIsWalletsPage(false);
                }}
              >
                <img
                  src={SolanaImageUrl}
                  alt="sol"
                  className="h-10 w-10 mr-4"
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
                <div className="p-2 rounded-full hover:bg-black right-20 absolute">
                  {copied?.value && copied.walletId === wallet.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#4c94ff"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#969faf"
                      className="size-8"
                      onClick={() => copyPublicKey(wallet.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
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
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#969faf"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
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
    </div>
  );
}
