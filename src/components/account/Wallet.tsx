import { Dispatch, SetStateAction, useState } from "react";
import { ChangeWallet } from "./ChangeWallet";
import { getEthereumbalance, getSolanaBalance, updateUser, updateUserByEmail } from "@/server/user";
import {
  IswalletsPageType,
  SetWalletType,
  WalletType,
} from "@/lib/types/wallettypes";
import { decrypt } from "@/lib/utils/encrytion";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import WalletHomePage from "../WalletHomePage";
import { LuChevronDown, LuChevronLeft, LuCirclePlus, LuEye, LuFileKey, LuRecycle } from "react-icons/lu";
import { useStoreContext } from "@/hooks/useWallets";
import { ethers, Wallet } from "ethers";

export function WalletComponent({
  wallets,
  setWallets,
  encryptedMneumonic,
  iv,
  mykey
}: {
 wallets : WalletType[]
 setWallets : Dispatch<SetStateAction<WalletType[] | null>>
 encryptedMneumonic : string,
 iv : string
 mykey : string
}) {
  const [iswalletsPage, setIsWalletsPage] =
    useState<IswalletsPageType>("wallet");
  const [model, setModel] = useState<boolean>(false);
  const [selectedWallet, setSellectedWallet] = useState<number>(wallets[0].walletNumber);


  console.log("wallets in wallet component is ", wallets)

  console.log("Selected Wallets is ", selectedWallet)

 
  // localstorage to persist data
  const getBalanceOnRefresh = async () => {
    const walletPublickey = wallets?.filter(
      (wallet) => wallet.walletNumber === selectedWallet
    )[0].publicKey;
    const balance = await getSolanaBalance(walletPublickey || "")

    setWallets((prev) => {
      if (!prev) {
        return null;
      }
      const newWallets = prev?.map((wallet) => {
        if (wallet.walletNumber === selectedWallet) {
            return {...wallet, assetBalance : balance.orignalBalance, usdcBalance : Number(balance.usdcPrice)}
        }
        return wallet;
      });
      return newWallets;
    });
  };


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
          encryptedMneumonic={encryptedMneumonic}
          wallets={wallets}
          setWallets={setWallets}
          iv = {iv}
          myKey={mykey}
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
  iv,
  myKey
}: {
  setModel: Dispatch<SetStateAction<boolean>>;
  wallets: WalletType[] | null;
  encryptedMneumonic: string;
  setWallets: SetWalletType;
  iv : string
  myKey : string
}) {

  const {email,selectedNetwork} = useStoreContext()


  const createNewSolanaWallet = (mneumonic: string, walletNumber: number) => {
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


  const createNewEthereumWallet = (mneumonic : string, walletNumber : number) => {
    const seed = mnemonicToSeedSync(mneumonic)
    const path = `m/44'/60'/${walletNumber}'/0'`;
    const hdNode = ethers.HDNodeWallet.fromSeed(seed)
    const child = hdNode.derivePath(path);
    const data = new Wallet(child.privateKey);


    const signingKey = new ethers.SigningKey(data.privateKey);
  const publicKey = signingKey.publicKey;
   
    return {
      publicKey : publicKey,
      secret : data.privateKey,
      address : data.address
    }

  }

  const generateNewWallet = async () => {
    const decryptedData = decrypt(encryptedMneumonic, iv, myKey);

    console.log("Selected Network is ", selectedNetwork)

    if(selectedNetwork === "SOLANA"){
      if (wallets && wallets.length > 0) {
        console.log("Running here in generate new Wallets");
        const newWallet = createNewSolanaWallet(
          decryptedData,
          wallets[wallets.length - 1].walletNumber
        );
        const balance = await getSolanaBalance(newWallet.publicKey);
        const updatedUser = await updateUser(
          wallets[wallets.length - 1].useraccountId,
          newWallet.publicKey,
          selectedNetwork
        );
  
        // console.log(balance);
  
        if (newWallet.publicKey) {
          setWallets((prev) => {
            if (prev) {
              return [
                ...prev,
                {
                  publicKey: newWallet.publicKey,
                  walletNumber: prev.length + 1,
                  assetBalance: balance.orignalBalance,
                  usdcBalance : Number(balance.usdcPrice),
                  useraccountId: wallets[wallets.length - 1].useraccountId,
                  network : selectedNetwork
                },
              ];
            } else {
              return [
                {
                  publicKey: newWallet.publicKey,
                  walletNumber : 1,
                  assetBalance : balance.orignalBalance,
                  usdcBalance : Number(balance.usdcPrice),
                  useraccountId:
                    updatedUser?.updateUser.id ||
                    wallets[wallets.length - 1].useraccountId,
                  network  : selectedNetwork
                },
              ];
            }
          });
        }
      } else {
        const newWallet = createNewSolanaWallet(decryptedData, 0);
        const data = await updateUserByEmail(
          email!,
          newWallet.publicKey,
          selectedNetwork
        );
  
        if(newWallet.publicKey){
          setWallets(prev => {
            if(prev){
              return [...prev, {
                publicKey : newWallet.publicKey,
                assetBalance : data!.balance.orignalBalance,
                walletNumber : prev.length + 1,
                network : selectedNetwork,
                usdcBalance : Number(data!.balance.usdcPrice),
                useraccountId : data!.updateUser.id
              }]
            }
  
            return [{
              publicKey : newWallet.publicKey,
              assetBalance : data!.balance.orignalBalance,
              walletNumber : 1,
              network : selectedNetwork,
              usdcBalance : Number(data!.balance.usdcPrice),
              useraccountId : data!.updateUser.id
            }]
          })
        }
      }
    } else {
      if(wallets && wallets.length > 0){
        console.log("here")
        const newWallet = createNewEthereumWallet(decryptedData, wallets[wallets.length - 1].walletNumber)
        const balance = await getEthereumbalance(newWallet.publicKey);

        const updatedUser = await updateUser(
          wallets[wallets.length - 1].useraccountId,
          newWallet.publicKey,
          selectedNetwork
        );

        if (newWallet.publicKey) {
          setWallets((prev) => {
            if (prev) {
              return [
                ...prev,
                {
                  publicKey: newWallet.publicKey,
                  walletNumber: prev.length + 1,
                  assetBalance: balance.orignalBalance,
                  usdcBalance : Number(balance.usdcPrice),
                  useraccountId: wallets[wallets.length - 1].useraccountId,
                  network : selectedNetwork
                },
              ];
            } else {
              return [
                {
                  publicKey: newWallet.publicKey,
                  walletNumber : 1,
                  assetBalance : balance.orignalBalance,
                  usdcBalance : Number(balance.usdcPrice),
                  useraccountId:
                    updatedUser?.updateUser.id ||
                    wallets[wallets.length - 1].useraccountId,
                  network  : selectedNetwork
                },
              ];
            }
          });
        }
          

      } else {
        const newWallet = createNewEthereumWallet(decryptedData, 0);
        const balance = await getEthereumbalance(newWallet.publicKey);
        console.log("here again")
        const data = await updateUserByEmail(
          email!,
          newWallet.publicKey,
          selectedNetwork
        );
  
        if(newWallet.publicKey){
          setWallets(prev => {
            if(prev){
              return [...prev, {
                publicKey : newWallet.publicKey,
                assetBalance : balance.orignalBalance,
                walletNumber : prev.length + 1,
                network : selectedNetwork,
                usdcBalance : Number(balance.usdcPrice),
                useraccountId : data!.updateUser.id
              }]
            }
  
            return [{
              publicKey : newWallet.publicKey,
              assetBalance : data!.balance.orignalBalance,
              walletNumber : 1,
              network : selectedNetwork,
              usdcBalance : Number(data!.balance.usdcPrice),
              useraccountId : data!.updateUser.id
            }]
          })
        }
        
      }
    }

    setModel(false);
  };

  return (
    <div className="absolute top-4 left-[30%] rounded-lg flex justify-center w-2/5 bg-[#1A8DDD]">
      <div className="w-full h-full shadow-lg text-white p-4">
        <div
          className="mb-2 flex justify-start hover:cursor-pointer"
          onClick={() => setModel(false)}
        >
          <LuChevronLeft className="w-8 h-8 text-white hover:text-black" />
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
          <div className="flex justify-center items-center mr-4">
          <LuCirclePlus className="w-6 h-6" />
          </div>
          <h1 className="text-base font-semibold">Create a new Wallet</h1>
        </div>

        <div
          className="p-6 rounded-lg text-black flex bg-gray-100  mb-4 hover:bg-gray-300 hover:cursor-pointer border-2 border-[#9ea3be]"
          onClick={generateNewWallet}
        >
          <div className="flex justify-center items-center mr-4">
          <LuRecycle className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-base font-semibold">Recovery Phase</h1>
        </div>

        <div
          className="p-6 rounded-lg flex text-black bg-gray-100 mb-4 hover:bg-gray-300 hover:cursor-pointer border-2 border-[#9ea3be]"
          onClick={generateNewWallet}
        >
          <div className="flex justify-center items-center mr-4">
            <LuFileKey className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-base font-semibold">Private Key</h1>
        </div>

        <div
          className="p-6 rounded-lg flex text-black bg-gray-100 mb-4 hover:bg-gray-300 hover:cursor-pointer border-2 border-[#9ea3be]"
          onClick={generateNewWallet}
        >
          <div className="flex justify-center items-center mr-4">
            <LuEye className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-base font-semibold">Show only Public key</h1>
        </div>
      </div>
    </div>
  );
}
