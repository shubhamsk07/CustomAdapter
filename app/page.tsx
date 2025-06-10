"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <main className="flex  bg-slate-700 justify-center h-full">
      <div className="border hover:border-slate-900 rounded">

        <WalletMultiButton  />
        <div style={{color:'white',marginTop:'20px'}}>Web Based wallet (DCEX) ADAPTER</div>
        <p style={{color:'white'}}>Currently dosen't support transaction </p>
      </div>
    </main>
  );
}