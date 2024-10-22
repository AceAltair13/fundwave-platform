import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FundWave",
  description: "Simple and Secure Crowdfunding Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative sm:-8 p-4 bg-background min-h-screen flex flex-row">
              {/* Sidebar only visible on larger screens */}
              <aside className="sm:flex hidden mr-10">
                <Sidebar />
              </aside>

              <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar />
                <main>{children}</main>
                <Toaster />
              </div>
            </div>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
