import type { Metadata } from 'next'
import Image from "next/image";
import Link from "next/link";

import { getEpisode } from '@lib/neonFunctions.ts';

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const data = await getEpisode(slug);

    return {
        title: data.title,
        alternates: {
            canonical: './episodes',
        },
    }
}

export default async function EpisodeDynamic({
        params,
    }: {
        params: Promise<{ slug: string }>
    }) {
        const { slug } = await params;
        const data = await getEpisode(slug);
        const spotifyComponents = data.link_spotify.split('episode');

        return (
            <main>
                <div id="top-section" className="flex flex-row justify-center">
                    <div id="left-section">
                        <Image
                            id="episode-cover"
                            className="h-[300px] w-auto"
                            src={`/images/covers/episodes/${data.cover_filename}`}
                            alt={data.cover_alt_text}
                            width={2048}
                            height={2048}
                            priority
                        />
                        <iframe className="w-[300px] h-[152px] my-[1em]" src={`${spotifyComponents[0]}embed/episode/${spotifyComponents[1]}?utm_source=generator`} width="100%" height="352" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        <ul id="showlinks-container" className="flex flex-row justify-around align-center">
                            <li>
                                <Link href={data.link_spotify} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/images/icons/spotify-icon.svg"
                                        alt="Spotify"
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href={data.link_apple} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/images/icons/apple-icon.svg"
                                        alt="Apple Podcasts"
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href={data.link_amazon} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/images/icons/amazon-icon.svg"
                                        alt="Amazon Music"
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="right-section">
                        <div id="episode-info-container" className="flex flex-col align-start">
                            <h2>Season {data.season_num}</h2>
                            <div id="episode-info">
                                <h2>Soulbound Ep.{data.season_ep_num} - {data.title}</h2>
                                <p id="episode-description">{data.description}</p>
                                <p id="trigger-warnings">Trigger Warnings: {data.triggers}</p>
                            </div>
                        </div>
                        <div id="transcript-container">
                            However the fuck we render the transcript
                        </div>
                    </div>
                </div>
                <div id="credits-container">
                    {data.credits.filter((entry) => entry.superrole === 'cast').map((entry,index) => {
                        return (
                            <div key={index}>
                                <b>{entry.role}:</b> {entry.name}
                            </div>
                        )
                    })}
                    {data.credits.filter((entry) => entry.superrole === 'crew').map((entry,index) => {
                        return (
                            <div key={index}>
                                <b>{entry.role}:</b> {entry.name}
                            </div>
                        )
                    })}
                </div>
            </main>
        )
}