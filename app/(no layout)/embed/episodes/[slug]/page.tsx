import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEpisode } from '@lib/neonFunctions.ts';

export default async function EpisodeEmbed({
        params,
    }: {
        params: Promise<{ slug: string }>
    }) {
        const { slug } = await params;
        const data = await getEpisode(slug);
        if (!data?.id) {
            notFound(); // database returned that slug does not exist, redirect to 404 page
        }

        return (
            <main className="flex flex-row h-[100vh] w-[100vw] p-[1rem] bg-[#4D4D4D] rounded-4xl">
                <div id="left-section" className="h-full">
                    <Image
                        id="episode-cover"
                        className="h-full w-auto rounded-lg"
                        src={`/images/covers/episodes/${data.cover_filename}`}
                        alt={data.cover_alt_text}
                        width={300}
                        height={300}
                        priority
                    />
                </div>
                <div id="right-section" className="flex flex-col px-[1rem] grow">
                    <div id="episode-info-container" className="flex flex-col">
                        <div id="episode-title" className="flex flex-row justify-between">
                            <Link href={`https://thesoulboundseries.com/episodes/${data.slug}`} target="_blank" rel="noopener noreferrer">
                                <h2 className="underline hover:no-underline">S{data.season_num}E{data.season_ep_num} - {data.title}</h2>
                            </Link>
                        </div>
                        <p id="episode-description">
                            {data.description}
                        </p>
                    </div>
                    <ul id="showlinks-container" className="flex flex-row justify-around items-center py-[0.5rem] grow list-none">
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
            </main>
        )
}