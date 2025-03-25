import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soulbound",
  description: "A Sci-Fi Audio Drama by Immortal Sky Studios",
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
        <header className="flex flex-row justify-between">
          <div className="flex flex-row">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/soulboundName.svg"
                alt="Soulbound logo"
                width={20}
                height={20}
              />
            </a>
          </div>

          <div className="flex flex-row-reverse">

          </div>
        </header>
        
        {children}

        <footer>

        </footer>
      </body>
    </html>
  );
}
