"use client"

import { WelcomePage } from "@/components/home/WelcomePage";
import Page from "@/components/WalletHomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0e0f14] relative">
      <WelcomePage />
      {/* <Page /> */}
      {/* <WalletCard/> */}
    </main>
  );
}
