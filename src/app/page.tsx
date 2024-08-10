"use client"
import { OnBoardingTasks } from "@/components/OnBoardingTasks";
import { Wallet } from "@/components/Wallet";
import { useStep } from "@/hooks/useStep";
import Image from "next/image";

export default function Home() {
  const {step} = useStep();
  return (
    <main className="flex min-h-screen flex-col h-screen">
       <OnBoardingTasks />
       {/* <Wallet /> */}
       {/* <DoneBoarding /> */}
    </main>
  );
}
