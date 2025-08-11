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
        <iframe src={`/embed/episodes/${selectedEp.slug}`} className="h-[17.5rem] rounded-4xl overflow-hidden"/>
    )
}