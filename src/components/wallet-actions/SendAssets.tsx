import { useState } from "react";
import { AssetComponentsType } from "@/lib/types/wallettypes";
import { SolanaImageUrl } from "@/config/assets";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { connection } from "@/server/connection";
import crypto from "crypto"

export function SendAssets({
  senderPublicKey,
  secret,
  setAssetsComponents,
}: {
  senderPublicKey : string
  secret : string
  setAssetsComponents: (value: AssetComponentsType) => void;
}) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [receiverPublickey, setReceiverPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [model, setModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  const closeDrawerBottom = () => setModel(false);

  const modelOpen = () => {
    if(isNaN(Number(amount))){
      alert('Put a number in amount')
      return
    }
    if(amount && selectedAsset && receiverPublickey){
      setModel(true)
    }
  }

  const sendAssets = async () => {
    setLoading(true)
    console.log(secret)
    const arr = secret.split(",").map(x => Number(x))

    const encryptedKey = Uint8Array.from(arr);
    const decryptedKey = crypto.publicDecrypt(encryptedKey.toString(), Buffer.from("a"))
    console.log(decryptedKey)

    const keyPair = Keypair.fromSecretKey(decryptedKey)
    // do something here

    const transaction = new Transaction().add(
      SystemProgram.transfer({
          fromPubkey : new PublicKey(senderPublicKey),
          toPubkey : new PublicKey(receiverPublickey),
          lamports : LAMPORTS_PER_SOL * Number(amount)

      }))

      // Sign transaction and broadcast and confirm

      const signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [keyPair],
         );

        console.log(signature)
        setLoading(false);
        setModel(false)
  
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full flex justify-center flex-col">
        <div className="" onClick={() => setAssetsComponents("home")}>
          <svg
            className="size-8 text-neutral-500 hover:animate-bounce hover:cursor-pointer"
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
        <div className="flex justify-center mb-8">
          <h1 className="text-5xl text-white">Send</h1>
        </div>
      </div>

      <div className="w-full mb-8">
        <select
          className="p-4 w-full rounded-lg bg-[#202127] text-[#4b93f8] font-bold"
          onChange={(e: any) => setSelectedAsset(e.target.value)}
        >
          <option
            value={""}
            className="font-semibold p-3 text-[#727484]"
            selected
          >
            Select the Network
          </option>
          <option value="sol" className="font-semibold p-3">
            <img src={SolanaImageUrl} alt="sol" className="w-8 h-8" />
            Solana
          </option>
        </select>
      </div>

      <div className="w-full mb-4">
        <h1 className="text-base font-semibold text-[#727484] mb-2 ml-1">
          Public Address
        </h1>
        <input
          type="text"
          className="p-3 w-full bg-[#202127] rounded-lg mb-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]"
          placeholder="Enter Address"
          value={receiverPublickey}
          onChange={(e: any) => setReceiverPublicKey(e.target.value)}
        />
      </div>

      <div className="w-full mb-8">
        <h1 className="text-base font-semibold text-[#727484] mb-2 ml-1">
          Amount
        </h1>
        <input
          type="text"
          className="p-4 w-full bg-[#202127] rounded-lg mb-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]"
          placeholder="Enter Address"
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
        />
      </div>

      <div className="w-full">
        <button
          className="flex justify-center w-full bg-white text-lg text-[#202127] rounded-lg font-semibold p-3 hover:bg-slate-100"
          onClick={() => modelOpen()}
        >
          Review
        </button>
      </div>

      {model && (
        <div className="w-full absolute bg-transparent top-[30%] h-[18.6rem] z-40 py-12">
          <Drawer
            placement="bottom"
            open={model}
            onClose={closeDrawerBottom}
            className="p-4 bg-white absolute rounded-t-lg w-full"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >

            <div className="w-full mb-8 flex">
            <div className="hover:cursor-pointer" onClick={() => closeDrawerBottom()}>
            <svg className="h-8 w-8 text-gray-900 hover:text-gray-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
              <div className="w-full flex justify-center">
              <h1 className="text-3xl text-black font-semibold">
                Review
              </h1>
              </div>
            </div>
            <div className="flex justify-center w-full mb-8 text-lg font-semibold text-black">
              {`You are sending ${amount} to ${receiverPublickey} on ${selectedAsset}`}
            </div>

            <div className="w-full p-12">
              <button
                className="flex justify-center w-full bg-black text-lg text-white rounded-lg font-semibold p-3 hover:bg-gray-900"
                onClick={sendAssets}
              >
                {loading ? (<div className="h-4 w-4 animate-spin rounded-full text-white bg-white">

                </div>) : (<>Submit</>)}
              </button>
            </div>
          </Drawer>
         </div>
      )}
    </div>
  );
}
