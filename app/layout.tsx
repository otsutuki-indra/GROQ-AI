import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HELLX_CODER // PRIVATE_ACCESS",
  description: "Architectural AI Interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${mono.className} antialiased selection:bg-[#00FF41] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}