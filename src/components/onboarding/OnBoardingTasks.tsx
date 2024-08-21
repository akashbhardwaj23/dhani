import { useEffect, useState } from "react";
import { CreateOrImportWallet } from "./tasks/CreateOrImport";
import { useStep } from "@/hooks/useStep";
import { AccountName } from "./tasks/AccountName";
import { MnemonicInput } from "./tasks/MnemonicInput";
import { CreatePassword } from "./tasks/CreatePassword";
import { Wallet } from "../account/Wallet";
import type { OnBoardingTasksType } from "@/lib/types/onBoarding";

export function OnBoardingTasks() {
  const [onBoardingData, setOnBoardingData] = useState<OnBoardingTasksType>({
    action: "create",
    networkName: "SOLANA",
    mneumonic: "",
    email : "",
    password: "",
  });
  const { step, setStep, nextStep, prevStep } = useStep();

  console.log(onBoardingData);

  const steps = [
    <CreateOrImportWallet
      key={"CreateOrImportWallet"}
      onNext={(data) => {
        setOnBoardingData((onBoardingData) => ({
          ...onBoardingData,
          action: data.action,
        }));
        nextStep();
      }}
    />,

    <AccountName
      key={"AccountName"}
      onNext={(name) => {
        if (name) {
          setOnBoardingData((onBoardingData) => ({
            ...onBoardingData,
            networkName: name,
          }));
        }
        nextStep();
      }}
    />,
    <MnemonicInput
      key={"MnemonicInput"}
      onNext={async (data) => {
        setOnBoardingData((onBoardingData) => ({
          ...onBoardingData,
          mneumonic: data,
        }));
        nextStep();
      }}
    />,
    <CreatePassword
      key={"CreatePassword"}
      onNext={async (data) => {
        setOnBoardingData((onBoardingData) => ({
          ...onBoardingData,
          email : data.email,
          password: data.password,
        }));
        nextStep();
      }}
    />,
  ];



  return (
    <div className="w-full flex justify-center">
        <>
          {step === steps.length ? (
            <Wallet onBoardingData={onBoardingData} />
          ) : (
            <div className="w-full flex justify-center p-20">{steps[step]}</div>
          )}
        </>
    </div>
  );
}
