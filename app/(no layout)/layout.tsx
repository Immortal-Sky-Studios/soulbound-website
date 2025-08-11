import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "../globals.css";

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
    return (
        <html lang="en">
        <body
            className={`${oswald.variable} antialiased overflow-hidden`}
        >
            {children}
        </body>
        </html>
    );
}
