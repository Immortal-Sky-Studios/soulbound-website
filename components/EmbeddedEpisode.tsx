'use client'
import { use } from 'react';
import type { Selectable } from 'kysely';
import type { Episodes } from '@/kysely-types';

export default function EmbeddedEpisode({
    episode,
}: {
    episode: Promise<Selectable<Episodes>>
}) {
    const selectedEp = use(episode);
    return (
        <iframe src={`/episodes/${selectedEp.slug}`}/>
    )
}