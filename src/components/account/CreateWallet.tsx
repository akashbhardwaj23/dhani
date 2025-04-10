import { useStep } from "@/hooks/useStep";
import { OnBoardingTasksType } from "@/lib/types/onBoarding";
import { encrypt } from "@/lib/utils/encrytion";
import { useStoreContext } from "@/lib/utils/store/context";
import { createUser, getBalance } from "@/server/user";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { Wallet } from "./Wallet";
import { Loading } from "../ui/loading";




export function CreateWallet({
    onBoardingData
}: {
    onBoardingData : OnBoardingTasksType
}){

    const [encryptedMneumonic, setEncryptedMneumonic] = useState<string>("")
    const [iv, setIv] = useState("")
    const [key, setKey] = useState("")
    const {wallets, setWallets} = useStoreContext()
    const { setSecretKeys } = useStoreContext();
    const [error, setError] = useState<string>("");
    const {setEmail, setUserId} = useStoreContext()

    
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

      const { resetStep } = useStep();

      useEffect(() => {
          const createWalletAndGetBalance = async () => {
            if (!onBoardingData) {
              resetStep();
              return;
            }
    
            console.log(onBoardingData.password);
    
            const wallet = createWallet();
    
            const data = await encrypt(onBoardingData.mneumonic);
            console.log(data);
            console.log("Redering again");
            setKey(data.key)
            setIv(data.initVector)
            setEncryptedMneumonic(data.encryptedData);
            const response = await createUser(
              onBoardingData.email,
              onBoardingData.password,
              data.encryptedData,
              data.initVector,
              data.key,
              wallet.publicKey
            );

            console.log(response);
            console.log(wallet.secret);

            setEmail(response?.account.email)
            setUserId(response?.account.id)
            if (!response?.account) {
              console.log("Here");
              setError("No Account Created");
              return;
            }
    
            const balance = await getBalance(wallet.publicKey);
            console.log(balance);
            setSecretKeys(prev => {
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
                    walletNumber : prev.length + 1,
                    assetBalance: balance.orignalBalance,
                    usdcBalance : Number(balance.usdcPrice),
                    useraccountId: response.account.id,
                    network : onBoardingData.networkName
                  },
                ];
              } else {
                return [
                  {
                    publicKey: wallet.publicKey,
                    walletNumber : 1,
                    assetBalance: balance.orignalBalance,
                    usdcBalance : Number(balance.usdcPrice),
                    useraccountId: response.account.id,
                    network : onBoardingData.networkName
                  },
                ];
              }
            });
          };
          createWalletAndGetBalance();
        
      }, []);


      if (error) {
        return (
          <div className="flex flex-col items-center justify-center h-screen w-full text-white">
            <h1 className="flex justify-center mb-4 text-3xl">
              {error}
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
    

     if(wallets){
        return (
            <Wallet encryptedMneumonic={encryptedMneumonic} setWallets={setWallets} wallets={wallets} iv={iv} mykey={key} />
          )
        
     }
    
      return (
        <div className="flex justify-center h-96 w-full items-center text-3xl text-white">
          <Loading />
        </div>
      );
}