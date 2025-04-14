import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react';

import EpisodeLinkButton from "@/components/EpisodeLinkButton";
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
            <header className="flex flex-row justify-between p-[1em]">
            <div className="flex flex-row">
                <Link
                    href="/"
                >
                    <Image
                        src="/icons/soulboundName.svg"
                        alt="Soulbound logo"
                        width={200}
                        height={24}
                    />
                </Link>
            </div>

            <ul id="nav-bar" className="flex flex-row list-none justify-center w-1/3 sticky top-0">
                <Suspense fallback={<li><Link href="#" className="px-[0.5em] py-[0.25em] bg-cyan-300 border-2">Latest Episode</Link></li>}>
                    <EpisodeLinkButton episode={data}/>
                </Suspense>
                <li><Link href="/episodes" className="px-[0.5em] py-[0.25em] bg-cyan-300 border-2">Episodes</Link></li>
                <li><Link href="/about-us" className="px-[0.5em] py-[0.25em] bg-cyan-300 border-2">About Us</Link></li>
            </ul>
            </header>
            
            {children}

            <footer className="flex flex-row justify-between align-center h-[5em] p-[1em]">
                <ul id="footer-links" className="flex flex-row justify-center w-1/4 py-[1em] list-none">
                    <Suspense fallback={<li><Link href="#" className="px-[0.5em] py-[0.25em] bg-cyan-300 border-2">Latest Episode</Link></li>}>
                        <EpisodeLinkButton episode={data}/>
                    </Suspense>
                    <li><Link href="/episodes"  className="px-[0.5em] py-[0.25em] bg-cyan-300 border-2">Episodes</Link></li>
                    <li><Link href="/about-us"  className="px-[0.5em] py-[0.25em] bg-cyan-300 border-2">About Us</Link></li>
                </ul>
                <a id="back-to-top" href="#top" className="py-[1em]">Back to top</a>
                <div id="copyright-notice" className="w-[30em] py-[0.5em] text-[0.75em] text-center text-background bg-[#414042] border-2 border-[#58595b]">
                    Soulbound is published under an Attribution-NonComercial-ShareAlike 4.0 International License
                </div>
            </footer>
        </body>
        </html>
    );
}
