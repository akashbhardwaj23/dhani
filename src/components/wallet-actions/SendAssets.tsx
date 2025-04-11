import { useState } from "react";
import { AssetComponentsType } from "@/lib/types/wallettypes";
// import { EthereumImageUrl, SolanaImageUrl } from "@/config/assets";
import {
  Drawer,
} from "@material-tailwind/react";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { connection } from "@/server/connection";
import { useStoreContext } from "@/hooks/useWallets";
import { LuArrowLeft, LuCircleX } from "react-icons/lu";
import { SiEthereum, SiSolana } from "react-icons/si";

export function SendAssets({
  senderPublicKey,
  setAssetsComponents,
}: {
  senderPublicKey: string;
  setAssetsComponents: (value: AssetComponentsType) => void;
}) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [receiverPublickey, setReceiverPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [model, setModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {secretKeys} = useStoreContext()
  const [signature, setSignature] = useState<string>("");

  const closeDrawerBottom = () => setModel(false);

  const modelOpen = () => {
    if (isNaN(Number(amount))) {
      alert("Put a number in amount");
      return;
    }
    if (amount && selectedAsset && receiverPublickey) {
      setModel(true);
    }
  };

  const sendAssets = async () => {
    setLoading(true);
    const secret = secretKeys?.find((value) => {
      if (value.walletId === senderPublicKey) {
        return value.secret;
      }
    });
    console.log(secret)
    const arr = secret?.secret.split(",").map((x : string) => Number(x)) || [];

    const encryptedKey = new Uint8Array(arr);
    const keyPair = Keypair.fromSecretKey(encryptedKey);
    console.log(keyPair);
    // do something here

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(senderPublicKey),
        toPubkey: new PublicKey(receiverPublickey),
        lamports: LAMPORTS_PER_SOL * Number(amount),
      })
    );

    // Sign transaction and broadcast and confirm

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      keyPair,
    ]);

    console.log(signature);
    setLoading(false);
    setModel(false);
    setSignature(signature)
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-10">
      <div className="relative flex w-[40rem] flex-col rounded-xl bg-white bg-clip-border text-black shadow-md">
        {signature ? (
          <div className="p-10">
            <div className="w-full flex justify-between flex-col">
              <div className="p-4 flex flex-wrap justify-center items-center text-2xl font-semibold break-words">
                Transaction Done  
              </div>
              <div className="flex justify-center">
                {signature}
                </div>


                <div className="my-8 ">
                      <button className="bg-black bg-clip-border text-white rounded-lg px-4 py-3 hover:bg-gray-900" onClick={() => setSignature("")}>
                          Go Back
                      </button>
                </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="w-full flex justify-center flex-col">
              <div className="mb-6" onClick={() => setAssetsComponents("home")}>
                <LuArrowLeft className="w-8 h-8 text-gray-900 hover:text-gray-600" />
              </div>
              <div className="flex items-center mb-2">
                <h1 className="text-3xl text-black font-bold">Send Tokens</h1>
              </div>
            </div>

            <div className="w-full mb-4">
              <select
                className="select select-bordered w-full bg-gray-100 text-[#1A8DDD]  font-bold"
                onChange={(e: any) => setSelectedAsset(e.target.value)}
              >
                <option disabled value={"SOLANA"}>
                  Select the Network
                </option>
                <option key={"SOLANA"}>
                  <SiSolana className="w-8 h-8" />
                  Solana
                </option>
                <option key={"ETHEREUM"}>
                  <SiEthereum className="w-8 h-8" />
                  Ethereum
                </option>
              </select>
            </div>

            <div className="w-full mb-4">
              <h1 className="text-base font-semibold text-black mb-2 ml-1">
                Public Address
              </h1>
              <input
                type="text"
                className="py-6 px-4 w-full bg-gray-100 text-black rounded-lg mb-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]"
                placeholder="Enter Address"
                value={receiverPublickey}
                onChange={(e: any) => setReceiverPublicKey(e.target.value)}
              />
            </div>

            <div className="w-full mb-8">
              <h1 className="text-base font-semibold text-black mb-2 ml-1">
                Amount
              </h1>
              <input
                type="text"
                className="py-6 px-4 w-full bg-gray-100 text-black rounded-lg mb-2 focus:outline-none focus:border-none focus:outline-2 focus:outline-[#4b93f8]"
                placeholder="Enter Address"
                value={amount}
                onChange={(e: any) => setAmount(e.target.value)}
              />
            </div>

            <div className="w-full">
              <button
                className="flex justify-center w-full text-lg text-white bg-black rounded-lg font-semibold p-3 hover:bg-gray-900"
                onClick={() => modelOpen()}
              >
                Review
              </button>
            </div>

            {model && (
              <div className="w-full absolute left-0 bg-transparent top-[8%] h-[30rem] z-40 py-12 rounded-lg">
                <Drawer
                  placement="bottom"
                  open={model}
                  onClose={closeDrawerBottom}
                  className="p-4 bg-black absolute rounded-t-lg w-full"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <div className="w-full mb-8 flex">
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => closeDrawerBottom()}
                    >
                      <LuCircleX className="h-8 w-8 text-gray-100 hover:text-gray-300" />
                    </div>
                    <div className="w-full flex justify-center mb-10">
                      <h1 className="text-3xl text-white font-semibold">
                        Review
                      </h1>
                    </div>
                  </div>
                  <div className="flex justify-center w-full mb-20 text-2xl font-semibold text-gray-200">
                    {`You are sending ${amount} to ${receiverPublickey} on ${selectedAsset}`}
                  </div>

                  <div className="w-full p-12">
                    <button
                      className="flex justify-center w-full bg-white text-lg text-black rounded-lg font-semibold p-3 hover:bg-gray-300"
                      onClick={sendAssets}
                    >
                      {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full text-black bg-black"></div>
                      ) : (
                        <>Submit</>
                      )}
                    </button>
                  </div>
                </Drawer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
