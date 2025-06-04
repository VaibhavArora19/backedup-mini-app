import type { Metadata } from "next";

import { getSession } from "../lib/auth"
import "~/app/globals.css";
import { Providers } from "@/src/app/providers";
import { APP_NAME, APP_DESCRIPTION } from "@/src/lib/constants";
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const Practa = localFont({
  src: "./fonts/Practa.otf",
  display: "swap",
  variable: "--font-practa"
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  const session = await getSession()

  return (
    <html lang="en">
      <body className={`${Practa.variable}`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
