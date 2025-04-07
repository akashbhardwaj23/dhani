import { useStep } from "@/hooks/useStep";
import { useWallets } from "@/hooks/useWallets";
import { OnBoardingTasksType } from "@/lib/types/onBoarding";
import { useStoreContext } from "@/lib/utils/store/context";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { encrypt } from "@/lib/utils/encrytion";
import { createUser, getBalance, getUserMneumonic } from "@/server/user";
import { Wallet } from "./Wallet";
import { Loading } from "../ui/loading";



export function LoadWalletsData({
    email
} : {
    email?: string;
}){
    const [error, setError] = useState<string>("");
    const { wallets, setWallets } = useWallets(email || "");
    const [encryptedMneumonic, setEncryptedMneumonic] = useState<string>("");
    const [iv, setIv] = useState("")
    const [myKey, setMyKey] = useState("")

    const { resetStep } = useStep();

    useEffect(() => {
        const fetchUserMneumonic = async () => {
           if(!email){
            setError("Email Not Present")
            return
           }
           const data = await getUserMneumonic(email);

           if(!data?.mneumonic){
            setError("No Mneumonic Present")
            return
           }
           setMyKey(data.key)
           setIv(data.iv)
           setEncryptedMneumonic(data.mneumonic);
        }

        fetchUserMneumonic()
    }, [])

  

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
       <Wallet encryptedMneumonic={encryptedMneumonic} setWallets={setWallets} wallets={wallets} iv={iv} mykey={myKey} />
    )
  }
  
    return (
      <div className="flex justify-center h-96 w-full items-center text-3xl text-white">
        <Loading />
      </div>
    );

}