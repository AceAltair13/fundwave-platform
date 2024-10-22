import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FundWave",
  description: "Simple and Secure Crowdfunding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative sm:-8 p-4 bg-background min-h-screen flex flex-row">

              <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
              </div>

              <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar />
                <main>{children}</main>
              </div>

            </div>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
