import Image from "next/image";
import Link from "next/link";

import { getEpisode } from '@lib/neonFunctions.ts';

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
                <div id="top-section">
                    <div id="left-section">
                        <Image
                            id="episode-cover"
                            className=""
                            src={`/covers/episodes/${data.cover_filename}`}
                            alt={data.cover_alt_text}
                            width={300}
                            height={300}
                            priority
                        />
                        <iframe className="border-12" src={`${spotifyComponents[0]}embed/episode/${spotifyComponents[1]}?utm_source=generator`} width="100%" height="352" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        <ul id="showlinks-container" className="flex flex-row justify-around align-center">
                            <li>
                                <Link href={data.link_spotify} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/icons/spotify-icon.svg"
                                        alt="Spotify"
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href={data.link_apple} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/icons/apple-icon.svg"
                                        alt="Apple Podcasts"
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href={data.link_amazon} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/icons/amazon-icon.svg"
                                        alt="Amazon Music"
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="right-section">
                        <div id="episode-info-container">
                            <h2>Season {data.season_num}</h2>
                            <div id="episode-info">
                                <h2>Soulbound Ep.{data.ep_num} - {data.title}</h2>
                                <p id="episode-description">{data.description}</p>
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