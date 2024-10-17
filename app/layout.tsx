import type { Metadata } from "next";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

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
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
