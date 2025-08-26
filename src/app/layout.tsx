import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundProvider } from '@/app/components/context';
import {UsernameProvider} from '@/app/components/context'
import {SignedInProvider} from '@/app/components/context'
import { MoneyContextProvider } from "@/app/components/context";
import { BackgroundContainer } from './components/background';
import { PuppyContextProvider } from "@/app/components/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focus Pet",
  description: "Your Personalized Digital Study Space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >   
            
        <BackgroundProvider>
          <PuppyContextProvider>
          <BackgroundContainer>
            <MoneyContextProvider>
              <UsernameProvider>
                <SignedInProvider>
                  {children}
                </SignedInProvider>
              </UsernameProvider>
            </MoneyContextProvider>
          </BackgroundContainer>
          </PuppyContextProvider>
        </BackgroundProvider>
       

      </body>
    </html>
  );
}
