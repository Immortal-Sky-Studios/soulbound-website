'use client'
import Link from "next/link";
import { use } from 'react';

export default function EpisodeLinkButton({
    episode,
}: {
    episode: Promise<Record<string, any>>
}) {
    const latestEp = use(episode);
    return (
        <ul className="flex flex-row list-none justify-start align-center m-[0.5em]">
            <li className="flex justify-center align-center bg-cyan-300 border-2 h-fit"><Link href={`/episodes/${latestEp.slug}`} className="px-[0.5em] py-[0.25em]">Latest Episode</Link></li>
            <li className="flex justify-center align-center bg-cyan-300 border-2 h-fit"><Link href="/episodes" className="px-[0.5em] py-[0.25em]">Episodes</Link></li>
            <li className="flex justify-center align-center bg-cyan-300 border-2 h-fit"><Link href="/about-us" className="px-[0.5em] py-[0.25em]">About Us</Link></li>
        </ul>
    )
}