"use client"
import { OnBoardingTasks } from "@/components/onboarding/OnBoardingTasks";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col h-screen">
       <OnBoardingTasks />
       {/* <Wallet /> */}
       {/* <DoneBoarding /> */}
    </main>
  );
}
