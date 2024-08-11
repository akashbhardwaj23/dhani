import { useState } from "react";
import { CreateOrImportWallet } from "./tasks/CreateOrImport";
import { useStep } from "@/hooks/useStep";
import { AccountName } from "./tasks/AccountName";
import { MnemonicInput } from "./tasks/MnemonicInput";
import { CreatePassword } from "./tasks/CreatePassword";
import { Wallet } from "../account/Wallet";


export function OnBoardingTasks(){
    const [onBoardingData, setOnBoardingData] = useState();
    const [mnemonic, setMneumonic] = useState<string>()
    // const [accountName, setAccountName] = useState()
    const {step, setStep, nextStep, prevStep} = useStep();

    const steps = [
      <CreateOrImportWallet
        key={"CreateOrImportWallet"}
        onNext={(data) => {
          setOnBoardingData({ ...data });
          nextStep();
        }}
      />,
  
      <AccountName
        key={"AccountName"}
        onNext={(name) => {
          if (name) {
            //@ts-ignore
            setOnBoardingData({ accountName: name });
          }
          nextStep();
        }}
      />,
      <MnemonicInput
        key={"MnemonicInput"}
        onNext={async (data) => {
          setMneumonic(data)
          //@ts-ignore
          setOnBoardingData({ mnemonic: data });
          nextStep();
        }}
      />,
      <CreatePassword
        key={"CreatePassword"}
        onNext={async (data) => {
          //@ts-ignore
          setOnBoardingData({data});
          nextStep();
        }}
      />,
    ];
   


    return (
        <div className="w-full flex justify-center p-20">
            {step === steps.length ? (
                <Wallet mnemonic={mnemonic || ""}/>
            ): (
                <>
                {steps[step]}
                </>
            )}
        </div>
    )
}