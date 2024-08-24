// import { WalletHomePage } from "./WalletHomePage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChangeWallet } from "./ChangeWallet";
import { createUser, getBalance, updateUser } from "@/server/user";
import {
  IswalletsPageType,
  SetWalletType,
  WalletType,
} from "@/lib/types/wallettypes";
import { useRecoilState } from "recoil";
import { SecretKey } from "@/lib/utils/state/recoil";
import { OnBoardingTasksType } from "@/lib/types/onBoarding";
import { useStep } from "@/hooks/useStep";
import { Loading } from "../ui/loading";
import { decrypt, encrypt } from "@/lib/utils/encrytion";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useWallets } from "@/hooks/useWallets";
import WalletHomePage from "../WalletHomePage";

export function Wallet({
  email,
  onBoardingData,
}: {
  email?: string;
  onBoardingData?: OnBoardingTasksType;
}) {
  const [iswalletsPage, setIsWalletsPage] =
    useState<IswalletsPageType>("wallet");
  const [model, setModel] = useState<boolean>(false);
  const { wallets, setWallets } = useWallets(email || "");
  const [encrtedMneumonic, setEncryptedMneumonic] = useState<string>("");
  const [selectedWallet, setSellectedWallet] = useState<number>(1);
  const [secretKeys, setSeceretKeys] = useRecoilState(SecretKey);
  const [error, setError] = useState<boolean>(false);
  const { resetStep } = useStep();

  const createWallet = () => {
    const seed = mnemonicToSeedSync(onBoardingData?.mneumonic || "");
    const path = `m/44'/501'/0'/0'`; // This is the derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    return {
      publicKey,
      secret,
    };
  };

  useEffect(() => {
    const wallets = JSON.parse(localStorage.getItem("wallets") || "");
    if (!wallets) {
      console.log("Runnig useEffect");
      const createWalletAndGetBalance = async () => {
        if (!onBoardingData) {
          resetStep();
          return;
        }

        console.log(onBoardingData.password);

        const wallet = createWallet();

        const encryptedData = encrypt(onBoardingData.mneumonic);
        console.log(encryptedData);
        console.log("Redering again");
        setEncryptedMneumonic(encryptedData);
        const response = await createUser(
          onBoardingData.email,
          onBoardingData.password,
          encryptedData,
          wallet.publicKey
        );
        console.log(response);
        console.log(wallet.secret);
        if (!response?.account) {
          console.log("Here");
          setError(true);
          return;
        }

        const balance = await getBalance(wallet.publicKey);
        console.log(balance);
        setSeceretKeys(prev => {
          if(prev){
            return [
              ...prev,
              {
                walletId : wallet.publicKey,
                secret : wallet.secret.toString()
              }
            ]
          } else {
           return [
              {
                walletId : wallet.publicKey,
                secret : wallet.secret.toString()
              }
            ]
          }
        });

        // setWalletPublicKey(response.publicKey);
        setWallets((prev) => {
          if (prev) {
            return [
              ...prev,
              {
                publicKey: wallet.publicKey,
                id: prev.length + 1,
                assetBalance: balance.orignalBalance,
                usdcBalance : Number(balance.usdcPrice),
                accountId: response.account.id,
              },
            ];
          } else {
            return [
              {
                publicKey: wallet.publicKey,
                id: 1,
                assetBalance: balance.orignalBalance,
                usdcBalance : Number(balance.usdcPrice),
                accountId: response.account.id,
              },
            ];
          }
        });
      };
      createWalletAndGetBalance();
    }
  }, []);

  console.log(wallets);

  const getBalanceOnRefresh = async () => {
    const walletPublickey = wallets?.filter(
      (wallet) => wallet.id === selectedWallet
    )[0].publicKey;
    const balance = await getBalance(walletPublickey || "");

    setWallets((prev) => {
      if (!prev) {
        return null;
      }
      const newWallets = prev?.map((wallet) => {
        if (wallet.id === selectedWallet) {
            return {...wallet, assetBalance : balance.orignalBalance, usdcBalance : Number(balance.usdcPrice)}
        }
        return wallet;
      });
      return newWallets;
    });
  };

  if (!wallets && !error) {
    return (
      <div className="flex justify-center h-96 w-full items-center text-3xl text-white">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full text-white">
        <h1 className="flex justify-center mb-4 text-3xl">
          Database Connection Error
        </h1>
        <button
          className="p-2 rounded-md border border-gray-600 bg-transparent"
          onClick={() => {
            resetStep();
            window.location.reload();
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`w-full relative ${model ? "blur-sm" : ""}`}>
        {iswalletsPage === "change-wallet" ? (
          <>
            <ChangeWallet
              setIsWalletsPage={setIsWalletsPage}
              setModel={setModel}
              wallets={wallets}
              setSellectedWallet={setSellectedWallet}
              selectedWallet={selectedWallet}
            />
          </>
        ) : (
          <WalletHomePage
            wallets={wallets}
            selectedWallet={selectedWallet}
            onClick={() => getBalanceOnRefresh()}
            onClickAppbar={() => setIsWalletsPage("change-wallet")}
          />
        )}

        <div className="bg-transparent ml-96 rounded-full mt-10 w-0 h-0 shadow-background"></div>
      </div>
      {model && (
        <Model
          setModel={setModel}
          encryptedMneumonic={encrtedMneumonic}
          wallets={wallets}
          setWallets={setWallets}
        />
      )}
    </>
  );
}

function Model({
  setModel,
  wallets,
  encryptedMneumonic,
  setWallets,
}: {
  setModel: Dispatch<SetStateAction<boolean>>;
  wallets: WalletType[] | null;
  encryptedMneumonic: string;
  setWallets: SetWalletType;
}) {
  const createNewWallet = (mneumonic: string, walletNumber: number) => {
    const seed = mnemonicToSeedSync(mneumonic);
    const path = `m/44'/501'/${walletNumber}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    return {
      publicKey,
      secret,
    };
  };

  const generateNewWallet = async () => {
    const decryptedData = decrypt(encryptedMneumonic);

    if (wallets) {
      console.log("Running here in generate new Wallets");
      const newWallet = createNewWallet(
        decryptedData,
        wallets[wallets.length - 1].id
      );
      const balance = await getBalance(newWallet.publicKey);
      const updatedUser = await updateUser(
        wallets[wallets.length - 1].accountId,
        newWallet.publicKey
      );

      console.log(balance);

      if (newWallet.publicKey) {
        setWallets((prev) => {
          if (prev) {
            return [
              ...prev,
              {
                publicKey: newWallet.publicKey,
                id: prev.length + 1,
                assetBalance: balance.orignalBalance,
                usdcBalance : Number(balance.usdcPrice),
                accountId: wallets[wallets.length - 1].accountId,
              },
            ];
          } else {
            return [
              {
                publicKey: newWallet.publicKey,
                id: 1,
                assetBalance : balance.orignalBalance,
                usdcBalance : Number(balance.usdcPrice),
                accountId:
                  updatedUser?.updateUser.id ||
                  wallets[wallets.length - 1].accountId,
              },
            ];
          }
        });
      }
    }

    setModel(false);
  };

  return (
    <div className="absolute top-4 flex justify-center w-2/5 bg-[#1A8DDD]">
      <div className="w-full h-full rounded-xl shadow-lg text-white p-4">
        <div
          className="mb-2 flex justify-start hover:cursor-pointer"
          onClick={() => setModel(false)}
        >
          <svg
            className="size-8 text-red-500 hover:text-red-700"
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
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </div>
        <div className="flex flex-col items-center mb-8">
          <img src="/icon.png" alt="airdrop" className="w-16 h-16 contrast-200 mb-4" />
          <h1 className="text-4xl text-white font-semibold mb-4">Account 1</h1>
          <h2 className="text-xl text-gray-100 font-semibold">
            Add a new Solana wallet to this account.
          </h2>
        </div>

        <div
          className="p-6 rounded-lg flex text-black bg-gray-100 mb-4 hover:bg-gray-300 hover:cursor-pointer border-2 border-[#9ea3be]"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Create a new Wallet</h1>
        </div>

        <div
          className="p-6 rounded-lg text-black flex bg-gray-100  mb-4 hover:bg-gray-300 hover:cursor-pointer border-2 border-[#9ea3be]"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              className="size-6 text-red-500"
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
              <path d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1" />{" "}
              <path
                d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1"
                transform="rotate(120 12 13)"
              />{" "}
              <path
                d="M12 17l-2 2l2 2m-2 -2h9a2 2 0 0 0 1.75 -2.75l-.55 -1"
                transform="rotate(240 12 13)"
              />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Recovery Phase</h1>
        </div>

        <div
          className="p-6 rounded-lg flex text-black bg-gray-100 mb-4 hover:bg-gray-300 hover:cursor-pointer border-2 border-[#9ea3be]"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              className="size-6 text-red-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <circle cx="8" cy="15" r="4" />{" "}
              <line x1="10.85" y1="12.15" x2="19" y2="4" />{" "}
              <line x1="18" y1="5" x2="20" y2="7" />{" "}
              <line x1="15" y1="8" x2="17" y2="10" />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Private Key</h1>
        </div>

        <div
          className="p-6 rounded-lg flex text-black bg-gray-100 mb-4 hover:bg-gray-300 hover:cursor-pointer border-2 border-[#9ea3be]"
          onClick={generateNewWallet}
        >
          <div className="mr-4">
            <svg
              className="size-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h1 className="text-base font-semibold">Show only Public key</h1>
        </div>
      </div>
    </div>
  );
}
