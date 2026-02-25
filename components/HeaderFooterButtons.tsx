'use client'
import Link from "next/link";
import { use } from 'react';
import { getLatestEp } from "@/lib/neonFunctions";

export default function EpisodeLinkButton({
    episode,
}: {
    episode: ReturnType<typeof getLatestEp>
}) {
    const latestEp = use(episode);
    return (
        <ul className="flex flex-row list-none justify-start items-stretch m-[0.5rem]">
            <li className="flex justify-center items-center bg-cyan-300 border-2"><Link href={`/episodes/${latestEp?.slug}`} className="text-center px-[0.5rem] py-[0.25rem]">Latest Episode</Link></li>
            <li className="flex justify-center items-center bg-cyan-300 border-2"><Link href="/episodes" className="text-center px-[0.5rem] py-[0.25rem]">Episodes</Link></li>
            <li className="flex justify-center items-center bg-cyan-300 border-2"><Link href="/about-us" className="text-center px-[0.5rem] py-[0.25rem]">About Us</Link></li>
        </ul>
    )
}