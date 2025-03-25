import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Image from "next/image";

import { getLatestEp } from "./neonFunctions";

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Soulbound",
    description: "A Sci-Fi Audio Drama by Immortal Sky Studios",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await getLatestEp();
    return (
        <html lang="en">
        <body
            className={`${oswald.variable} ${oswald.variable} antialiased`}
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

            <ul id="nav-bar" className="flex flex-row-reverse list-none">
                <li><a href={`episodes/${data.slug}`}>Latest Ep</a></li>
                <li><a href="episodes">Episodes</a></li>
                <li><a href="about-us">About Us</a></li>
            </ul>
            </header>
            <a id="top" className="hidden"></a>
            
            {children}

            <footer>
                <ul id="footer-links" className="flex flex-row list-none">
                    <li>FOOTER LINKS GO HERE</li>
                </ul>
                <a id="back-to-top" href="#top">Back to top</a>
                <div id="copyright-notice"></div>
            </footer>
        </body>
        </html>
    );
}
