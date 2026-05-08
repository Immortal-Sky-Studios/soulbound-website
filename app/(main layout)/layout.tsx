import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react';

// Local Image Imports
import HeaderLogo from "@images/icons/header-logo-icon.svg";
import MetalShine from "@images/misc/MetalShine.png";

import HeaderFooterButtons from "@components/HeaderFooterButtons";
import { getLatestEp } from "@lib/neonFunctions";
import BackToTopButton from "@/components/BackToTopButton";

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    metadataBase: new URL('https://thesoulboundseries.com'),
    title: {
        template: "%s | Soulbound",
        default: "Soulbound"
    },
    description: "A Sci-Fi Audio Drama by Immortal Sky Studios",
    openGraph: {
        title: "Soulbound",
        description: "A Sci-Fi Audio Drama by Immortal Sky Studios",
        url: './',
        siteName: 'The Soulbound Series',
        locale: 'en_US',
        type: 'website',
    },
    alternates: {
        canonical: './',
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = getLatestEp('episodes');

    return (
        <html lang="en">
        <body
            className={`${oswald.className} antialiased text-black overflow-x-hidden`}
        >
            <a id="top" className=""></a>
            <div id="backtotop-region" className="relative">
                <header className="flex flex-row justify-between items-center bg-background border-[0.95rem] border-image-[url('/images/borders/HeaderFooterBorder.png')] border-slice-[200] border-image-width-[20px] border-repeat-stretch sticky top-0 z-100">
                    <Link
                        href="/"
                        className="m-[0.5rem] h-fit"
                    >
                        <Image
                            className="h-[2.5rem] w-auto"
                            src={HeaderLogo}
                            alt="Soulbound logo"
                            loading="eager"
                        />
                    </Link>

                    <Image
                        className="h-[3.5rem] w-auto"
                        src={MetalShine}
                        alt="Metal shine graphic"
                        priority
                    />

                    <Suspense fallback={
                        <ul className="flex flex-row list-none justify-center items-center w-1/3 m-[0.5rem]">
                            <li className="flex justify-center items-center bg-cyan-300 border-2"><Link href="#" className="px-[0.5rem] py-[0.25rem]">Loading</Link></li>
                        </ul>
                    }>
                        <HeaderFooterButtons episode={data}/>
                    </Suspense>
                </header>

                {children}

                <div id="backto-top-container" className="absolute flex flex-row justify-end items-end bottom-0 right-0 w-full h-full z-99 pointer-events-none">
                    <BackToTopButton/>
                </div>

            </div>
            <footer className="flex flex-row justify-between items-center border-[0.95rem] border-image-[url('/images/borders/HeaderFooterBorder.png')] border-slice-[200] border-image-width-[20px] border-repeat-stretch">
                <div id="footer-links-container" className="flex flex-row justify-around lg:w-1/3">
                    <Link href="/terms-of-use" className="underline text-cyan-300 hover:text-foreground">Terms Of Use</Link>
                    <Link href="mailto:thesoulboundseries@gmail.com" target="_blank" className="underline text-cyan-300 hover:text-foreground">Contact Us</Link>
                </div>
                <div id="copyright-notice" className="w-[20rem] py-[0.5rem] m-[1rem] text-[0.75rem] text-center text-background bg-[#414042] border-2 border-[#58595b]">
                    Soulbound is published under an Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
                </div>
            </footer>
        </body>
        </html>
    );
}
