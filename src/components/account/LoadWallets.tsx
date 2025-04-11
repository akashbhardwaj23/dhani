import { useStep } from "@/hooks/useStep";
import { useEffect, useState } from "react";
import { getUserMneumonic, getUserWallets } from "@/server/user";
import { WalletComponent } from "./Wallet";
import { Loading } from "../ui/loading";
import { useStoreContext } from "@/hooks/useWallets";



export function LoadWalletsData({
    email
} : {
    email?: string;
}){
    const [error, setError] = useState<string>("");
    const {wallets, setWallets, setEmail} = useStoreContext()
    const [encryptedMneumonic, setEncryptedMneumonic] = useState<string>("");
    const [iv, setIv] = useState("")
    const [myKey, setMyKey] = useState("")

    const { resetStep } = useStep();


    useEffect(() => {
      if(!wallets){
        setEmail(email)
        const getWallets = async () => {
            const newWallets = await getUserWallets(email || "")
            if(!newWallets){
                return
            }

            setWallets(newWallets.wallets)
       }

       getWallets()
       }
    }, [])

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
       <WalletComponent encryptedMneumonic={encryptedMneumonic} setWallets={setWallets} wallets={wallets} iv={iv} mykey={myKey} />
    )
  }
  
    return (
      <div className="flex justify-center h-96 w-full items-center text-3xl text-white">
        <Loading />
      </div>
    );

}