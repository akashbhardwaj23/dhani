import { useState } from "react";
import { CreateOrImportWallet } from "./tasks/CreateOrImport";
import { useStep } from "@/hooks/useStep";
import { AccountName } from "./tasks/AccountName";
import { MnemonicInput } from "./tasks/MnemonicInput";
import { CreatePassword } from "./tasks/CreatePassword";
import { Wallet } from "../account/Wallet";
import type { OnBoardingTasksType } from "@/lib/types/onBoarding";
import { createUser } from "@/server/user";



export function OnBoardingTasks(){
    const [onBoardingData, setOnBoardingData] = useState<OnBoardingTasksType>({
      action : "create",
      networkName : "SOLANA",
      mneumonic : "",
      password : ""
    });
    const [mnemonic, setMneumonic] = useState<string>()
    const [user, setUser] = useState()
    const {step, setStep, nextStep, prevStep} = useStep();

    console.log(onBoardingData);

    const steps = [
      <CreateOrImportWallet
        key={"CreateOrImportWallet"}
        onNext={(data) => {
          setOnBoardingData((onBoardingData) => ({...onBoardingData, action : data.action}));
          nextStep();
        }}
      />,
  
      <AccountName
        key={"AccountName"}
        onNext={(name) => {
          if (name) {
            //@ts-ignore
            setOnBoardingData((onBoardingData) => ({...onBoardingData, networkName : name}));
          }
          nextStep();
        }}
      />,
      <MnemonicInput
        key={"MnemonicInput"}
        onNext={async (data) => {
          setMneumonic(data)
          //@ts-ignore
          setOnBoardingData((onBoardingData) => ({...onBoardingData, mneumonic : data}));
          nextStep();
        }}
      />,
      <CreatePassword
        key={"CreatePassword"}
        onNext={async (data) => {
          setOnBoardingData((onBoardingData) => ({...onBoardingData, password : data}));
          nextStep();
        }}
      />,
    ];
   


    return (
        <div className="w-full flex justify-center p-20">
            {step === steps.length ? (
                <Wallet mnemonic={mnemonic || ""} onBoardingData ={onBoardingData}/>
            ): (
                <>
                {steps[step]}
                </>
            )}
        </div>
    )
}