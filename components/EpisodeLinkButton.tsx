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
        <li><Link href={`/episodes/${latestEp.slug}`} className="px-[0.5em] py-[0.25em] bg-cyan-300 border-2">Latest Episode</Link></li>
    )
}