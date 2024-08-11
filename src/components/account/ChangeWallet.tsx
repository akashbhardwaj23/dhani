import { Dispatch, SetStateAction, useState } from "react";
import { WalletType } from "@/lib/types/wallettypes";
import { SolanaImageUrl } from "@/config/assets";
import { RenameWalletAction, ShowSecretAction, RemoveWalletAction } from "../wallet-actions";
import { SelectedActions, SetActionBooleanType } from "@/lib/types/actiontype";

export function ChangeWallet({
  setIsWallets,
  setModel,
  wallets,
  setSellectedWallet,
  selectedWallet,
}: {
  setIsWallets: SetActionBooleanType;
  setModel: SetActionBooleanType;
  wallets: WalletType[] | null;
  setSellectedWallet: Dispatch<SetStateAction<number>>;
  selectedWallet: number;
}) {
  const [options, setOptions] = useState<boolean>(false);

  return (
    <div>
      {options ? (
        <WalletOptions setOptions={setOptions} wallets ={wallets} selectedWallet={selectedWallet} />
      ) : (
        <ShowWalletKeys
          setIsWallets={setIsWallets}
          setModel={setModel}
          setSellectedWallet={setSellectedWallet}
          selectedWallet={selectedWallet}
          wallets={wallets}
          setOptions={setOptions}
        />
      )}
    </div>
  );
}

function WalletOptions({
  setOptions,
  wallets,
  selectedWallet
}: {
  setOptions: SetActionBooleanType;
  wallets : WalletType[] | null;
  selectedWallet : number
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<SelectedActions>("");
  const wallet = wallets?.filter((w) => w.id === selectedWallet)[0];


  const copyText = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5_000);
    await navigator.clipboard.writeText("publicket");
  };

  if (selectedAction === "show-privatekey") {
    return <ShowSecretAction setSelectedAction={setSelectedAction} wallets={wallets} selectedWallet={selectedWallet} />;
  } else if (selectedAction === "rename-wallet") {
    return (
      <>
        <RenameWalletAction setSelectedAction={setSelectedAction} />
      </>
    );
  } else if (selectedAction === "remove-wallet") {
    return <RemoveWalletAction setSelectedAction={setSelectedAction} />;
  } else {
    return (
      <>
        <div className="flex flex-col">
          <div className="flex mb-6  px-4 pt-2 pb-4 text-xl text-white w-full">
            <div
              className="hover:cursor-pointer"
              onClick={() => setOptions(false)}
            >
              <svg
                className="size-8 text-red-500 hover:text-red-500/70"
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
            <h1 className="flex justify-center items-center w-full">
              Wallet {wallet?.id}
            </h1>
          </div>

          <div className="relative rounded-lg shadow-md bg-[#202127] text-base mb-4 text-white font-semibold">
            <div className="flex justify-between p-4 hover:bg-[#18191f] hover:cursor-pointer rounded-t-lg">
              <h1>Wallet Address</h1>
              <div className="flex justify-center items-center gap-2">
                <h2 className="mr-4">{wallet?.publicKey.slice(0, 4)}...{wallet?.publicKey.slice(wallet.publicKey.length - 4, wallet.publicKey.length)}</h2>
                <div className="" onClick={copyText}>
                  {!copied ? (
                    <svg
                      className="size-8 text-neutral-500"
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
                  ) : (
                    <svg
                      className="size-8 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {copied ? (
                <div className="absolute top-10 p-4 text-sm right-6 rounded-2xl text-white bg-red-500">
                  Copied
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className="flex justify-between p-4 rounded-b-lg hover:bg-[#18191f] hover:cursor-pointer"
              onClick={() => setSelectedAction("rename-wallet")}
            >
              <h1>Rename Wallet</h1>
              <div>
                <svg
                  className="size-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-md bg-[#202127] text-base text-white mb-4 font-semibold hover:bg-[#18191f]">
            <div
              className="flex justify-between items-center p-4 hover:cursor-pointer"
              onClick={() => setSelectedAction("show-privatekey")}
            >
              <h1>Show private key</h1>
              <div>
                <svg
                  className="size-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-md bg-[#202127] text-base text-red-500 mb-8 font-semibold hover:bg-[#18191f]">
            <div
              className="flex justify-between items-center p-4 hover:cursor-pointer"
              onClick={() => setSelectedAction("remove-wallet")}
            >
              <h1>Remove wallet</h1>
              <div>
                <svg
                  className="size-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function ShowWalletKeys({
  setModel,
  setIsWallets,
  wallets,
  selectedWallet,
  setSellectedWallet,
  setOptions,
}: {
  setIsWallets: SetActionBooleanType;
  setModel: SetActionBooleanType;
  wallets: WalletType[] | null;
  setSellectedWallet: Dispatch<SetStateAction<number>>;
  selectedWallet: number;
  setOptions: SetActionBooleanType;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const copyPublicKey = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5_000);
    await navigator.clipboard.writeText("walletPublicKey");
  };

  return (
    <>
      <div className={`flex mb-4`}>
        <div
          className=" flex items-center justify-center hover:cursor-pointer"
          onClick={() => setIsWallets((prev) => !prev)}
        >
          <svg
            className="size-6 text-red-500 hover:text-red-500/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-white text-2xl flex justify-center items-center font-semibold w-full">
          Wallets
        </h1>
      </div>
      <div className="p-2 flex justify-center mb-4">
        <div className="flex items-center rounded-full border border-black bg-[#202127] w-auto p-2 hover:bg-[#14151b] hover:cursor-pointer">
          <img src={SolanaImageUrl} alt="sol" className="w-8 h-8 mr-2" />
          <h1 className="text-base text-white font-semibold mr-2">Solana</h1>
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
      {wallets?.map((wallet) => (
        <div
          key={wallet.id}
          className={`bg-[#202127] p-6 flex justify-between items-center relative rounded-md  mb-8 ${
            selectedWallet === wallet.id ? "border-2 border-[#4c94ff]" : ""
          } hover:bg-[#14151b] hover:cursor-pointer`}
        >
          <div
            className="flex items-center"
            onClick={() => {
              setSellectedWallet(wallet.id);
              setIsWallets(false);
            }}
          >
            <img src={SolanaImageUrl} alt="sol" className="h-6 w-6 mr-8" />
            <div>
              <h1 className="text-white text-xl font-semibold">
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
              {copied ? (
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
                  onClick={copyPublicKey}
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
                setSellectedWallet(wallet.id)
                setOptions(true)
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
    </>
  );
}
