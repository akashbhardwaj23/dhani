import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreContextProvider } from "@/lib/utils/store/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "A Web based wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0e0f14] h-screen w-full`}>
        <StoreContextProvider>{children}</StoreContextProvider>
      </body>
    </html>
  );
}
