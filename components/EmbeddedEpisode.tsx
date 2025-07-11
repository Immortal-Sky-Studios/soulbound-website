'use client'
import { use } from 'react';
import { getEpisode } from '@/lib/neonFunctions';

export default function EmbeddedEpisode({
    episode,
}: {
    episode: ReturnType<typeof getEpisode>
}) {
    const selectedEp = use(episode);
    return (
        <iframe src={`/episodes/${selectedEp.slug}`}/>
    )
}