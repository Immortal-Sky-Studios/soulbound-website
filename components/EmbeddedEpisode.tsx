'use client'
import { use } from 'react';

export default function EmbeddedEpisode({
    episode,
}: {
    episode: Promise<Record<string, any>>
}) {
    const selectedEp = use(episode);
    return (
        <iframe src={`episodes/${selectedEp.slug}`}/>
    )
}