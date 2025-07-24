import type { Metadata } from 'next'
import Image from "next/image";
import Link from "next/link";
import { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getEpisode, getNearbyEp } from '@lib/neonFunctions.ts';

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
        if (!data?.id) {
            notFound(); // database returned that slug does not exist, redirect to 404 page
        }

        const prevEp = await getNearbyEp(data.id,-1);
        const nextEp = await getNearbyEp(data.id,1);
        const creditsOffset = data.credits.filter((entry) => entry.superrole === 'Cast').length + 2;
        const spotifyComponents = data.link_spotify.split('episode');

        return (
            <main className="min-h-screen w-full p-[2rem]">
                <div id="top-section" className="flex flex-col sm:flex-row justify-center">
                    <div id="left-section" className="mx-[1rem]">
                        <Image
                            id="episode-cover"
                            className="h-[300px] w-auto"
                            src={`/images/covers/episodes/${data.cover_filename}`}
                            alt={data.cover_alt_text}
                            width={2048}
                            height={2048}
                            priority
                        />
                        <iframe className="w-[300px] h-[152px] my-[1rem]" src={`${spotifyComponents[0]}embed/episode/${spotifyComponents[1]}?utm_source=generator`} width="100%" height="352" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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
                    <div id="right-section" className="flex flex-col align-start grow">
                        <div id="episode-info-container" className="flex flex-col align-start">
                            <div className="flex flex-row justify-between">
                                <h2 className="w-1/3 px-[1rem] border-2 mask-clip-border">Season {data.season_num}</h2> {/* mask-[url(/images/masks/season-mask.svg)] */}
                                <div id="prev-next-container" className="pt-[0.5em]">
                                    {prevEp && <Link href={`/episodes/${prevEp?.slug}`} className="h-min px-[1em] py-[0.25rem] border">{'<'} Prev</Link>}
                                    {nextEp && <Link href={`/episodes/${nextEp?.slug}`} className="h-min px-[1em] py-[0.25rem] border">Next {'>'}</Link>}
                                </div>
                            </div>
                            <div id="episode-info" className="flex flex-col justify-center border-2 -mt-[1rem] p-[1rem]">
                                <h2 className="text-center underline">{data.season_ep_num && `Soulbound Ep. ${data.season_ep_num} -`} {data.title}</h2>
                                <p id="episode-description" className="text-center">{data.description}</p>
                                <p id="trigger-warnings" className="text-center">Trigger Warnings: {data.triggers}</p>
                            </div>
                        </div>
                        <div id="transcript-container" className="flex flex-col border-2 mt-[1rem] p-[1rem] grow">
                            <h2 className="underline">Transcript</h2>
                            <div className="overflow-y-scroll grow">However the fuck we render the transcript</div>
                        </div>
                    </div>
                </div>
                <div id="credits-container" className="border-2 mt-[1rem] p-[1rem]">
                    <h2 className="flex flex-row justify-center">Cast</h2>
                    <div className="grid grid-cols-2 align-start justify-center">
                        {data.credits.filter((entry) => entry.superrole === 'Cast').map((entry) => {
                            return (
                                <Fragment key={entry.id}>
                                    <div className="flex flex-row-reverse mx-[1rem]"><b>{entry.role}:</b></div>
                                    <div>{entry.name}</div>
                                </Fragment>
                            )
                        })}
                    </div>

                    <h2 className="flex flex-row justify-center mt-[1rem]">Crew</h2>
                    <div className="grid grid-cols-2 align-start justify-center">
                        {data.credits.filter((entry) => entry.superrole === 'Crew').map((entry) => {
                            return (
                                <Fragment key={entry.id}>
                                    <div className="flex flex-row-reverse mx-[1rem]"><b>{entry.role}:</b></div>
                                    <div>{entry.name}</div>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </main>
        )
}