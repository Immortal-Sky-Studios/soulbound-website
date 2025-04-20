import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react';

import HeaderFooterButtons from "@/components/HeaderFooterButtons";
import { getLatestEp } from "@/lib/neonFunctions";

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"]
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
    const data = getLatestEp();

    return (
        <html lang="en">
        <body
            className={`${oswald.variable} antialiased text-black`}
        >
            <a id="top" className=""></a>
            <header className="flex flex-row justify-between align-center p-[1em] bg-background border-[0.5em] border-image-[url('/borders/HeaderFooterBorder.png')] border-slice-[200] border-image-width-[20px] border-repeat-stretch sticky top-0">
                <div className="flex flex-row">
                    <Link
                        href="/"
                    >
                        <Image
                            src="/icons/header-logo-icon.svg"
                            alt="Soulbound logo"
                            width={100}
                            height={12}
                        />
                    </Link>
                </div>

                <Suspense fallback={
                    <ul className="flex flex-row list-none justify-center align-center w-1/3">
                        <li className="flex justify-center align-center bg-cyan-300 border-2"><Link href="#" className="px-[0.5em] py-[0.25em]">Loading</Link></li>
                    </ul>
                }>
                    <HeaderFooterButtons episode={data}/>
                </Suspense>
            </header>
            
            {children}

            <footer className="flex flex-row justify-between align-center p-[1em] border-[1em] border-image-[url('/borders/HeaderFooterBorder.png')] border-slice-[200] border-image-width-[20px] border-repeat-stretch">
                <Suspense fallback={
                    <ul className="flex flex-row list-none justify-center align-center w-1/3">
                        <li className="flex justify-center align-center bg-cyan-300 border-2 h-fit"><Link href="#" className="px-[0.5em] py-[0.25em]">Loading</Link></li>
                    </ul>
                }>
                    <HeaderFooterButtons episode={data}/>
                </Suspense>
                <a id="back-to-top" href="#top" className="py-[1em]">Back to top</a>
                <div id="copyright-notice" className="w-[30em] py-[0.5em] text-[0.75em] text-center text-background bg-[#414042] border-2 border-[#58595b]">
                    Soulbound is published under an Attribution-NonComercial-ShareAlike 4.0 International License
                </div>
            </footer>
        </body>
        </html>
    );
}
