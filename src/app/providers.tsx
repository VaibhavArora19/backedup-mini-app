"use client";

import dynamic from "next/dynamic";
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { FrameProvider } from "../providers/FrameProvider";

const WagmiProvider = dynamic(
  () => import("../providers/WagmiProvider"),
  {
    ssr: false,
  }
);

export function Providers({ session, children }: { session: Session | null, children: React.ReactNode }) {
  return (
    <SessionProvider session={session}>
      <WagmiProvider>
        <FrameProvider>
            {children}
        </FrameProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
