'use client'
import { use } from 'react';
import { getLatestEp } from '@/lib/neonFunctions';

export default function EmbeddedEpisode({
    episode,
}: {
    episode: ReturnType<typeof getLatestEp>
}) {
    const selectedEp = use(episode);
    return (
        <iframe title="soulboundEpisode" src={`/embed/episodes/${selectedEp?.slug}`} className="h-[30rem] sm:h-[15rem] w-full rounded-4xl overflow-hidden"/>
    )
}