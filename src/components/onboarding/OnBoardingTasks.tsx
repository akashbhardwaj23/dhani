import { useState } from "react";
import { CreateOrImportWallet } from "./tasks/CreateOrImport";
import { useStep } from "@/hooks/useStep";
import { NetworkSelection } from "./tasks/NetworkSelection";
import { MnemonicInput } from "./tasks/MnemonicInput";
import { CreatePassword } from "./tasks/CreatePassword";
import type { OnBoardingTasksType } from "@/lib/types/onBoarding";
import { CreateWallet } from "../account/CreateWallet";

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

    <NetworkSelection
      key={"NetworkSelection"}
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
            <CreateWallet onBoardingData={onBoardingData} />
          ) : (
            <div className="w-full flex justify-center p-10 pt-20 md:p-20">{steps[step]}</div>
          )}
        </>
    </div>
  );
}
