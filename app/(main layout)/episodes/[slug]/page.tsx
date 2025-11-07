import type { Metadata } from 'next'
import Image from "next/image";
import Link from "next/link";
import { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getEpisode, getNearbyEp } from '@lib/neonFunctions.ts';
import EpisodeLinks from '@/components/EpisodeLinks';
import Transcript from '@/components/Transcript';

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

        const prevEp = await getNearbyEp(data.season_ep_num || data.ep_num,-1);
        const nextEp = await getNearbyEp(data.season_ep_num || data.ep_num,1);
        const spotifyComponents = data.link_spotify.split('episode');

        return (
            <main className="min-h-screen w-full p-[2rem]">
                <div id="top-section" className="flex flex-col sm:flex-row justify-center">
                    <div id="left-section" className="flex flex-col items-center sm:items-start sm:mx-[1rem]">
                        <Image
                            id="episode-cover"
                            className="h-[300px] w-auto"
                            src={`/images/covers/episodes/${data.cover_filename}`}
                            alt={data.cover_alt_text}
                            width={data.cover_width}
                            height={data.cover_height}
                            priority
                        />
                        <iframe className="w-[300px] h-[152px] my-[1rem]" src={`${spotifyComponents[0]}embed/episode/${spotifyComponents[1]}?utm_source=generator`} width="100%" height="352" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        <ul id="showlinks-container" className="flex flex-row justify-around items-center w-full mb-[1rem] sm:mb-0">
                            <EpisodeLinks links={[data.link_spotify,data.link_apple,data.link_amazon]}/>
                        </ul>
                    </div>
                    <div id="right-section" className="flex flex-col items-stretch align-start grow">
                        <div id="episode-info-container" className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <h2 className="w-1/3 px-[1rem] bg-cyan-300 border-x-4 border-t-4 border-[#414042] mask-clip-border mask-[url(/images/masks/RightAngledMask.png)]">Season {data.season_num}</h2> {/* mask-[url(/images/masks/season-mask.svg)] */}
                                <div id="prev-next-container" className="pt-[0.5em]">
                                    {prevEp && <Link href={`/episodes/${prevEp?.slug}`} className="h-min px-[1em] py-[0.25rem] bg-cyan-300 border border-[#414042]">{'<'} Prev</Link>}
                                    {nextEp && <Link href={`/episodes/${nextEp?.slug}`} className="h-min px-[1em] py-[0.25rem] bg-cyan-300 border border-[#414042]">Next {'>'}</Link>}
                                </div>
                            </div>
                            <div id="episode-info" className="flex flex-col justify-center bg-[url('/images/backgrounds/MetalHeartBackground.png')] bg-size-[4rem] bg-repeat border-4 border-[#414042] -mt-[1rem] p-[1rem]">
                                <h2 className="text-center underline">{data.season_ep_num && `Soulbound Ep. ${data.season_ep_num} -`} {data.title}</h2>
                                <p id="episode-description" className="text-center mb-[1rem] whitespace-pre-line">{data.description.replace(/\\n/g,"\n")}</p>
                                <p id="trigger-warnings" className="text-center whitespace-pre-line"><b>Trigger Warnings:</b> <br/> {data.triggers.replace(/\\n/g,"\n")}</p>
                            </div>
                        </div>
                        <div id="transcript-container" className="flex flex-col bg-[#949494] border-4 border-[#414042] mt-[1rem] px-[1rem] py-[0.5rem] grow">
                            <h2 className="underline">Transcript</h2>
                            <div className="overflow-y-scroll h-[13rem] text-[1.25rem]">
                                <Transcript transcript={data.transcript}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="credits-container" className="flex flex-col md:flex-row justify-around items-center mt-[1rem] p-[1rem] bg-cyan-300 text-blue-700 border-[1rem] border-image-[url('/images/borders/ThreeRivetBorder.png')] border-slice-[180] border-image-width-[1rem] border-repeat-round">
                    <div id="cast-container">
                        <h2 className="text-center">Cast</h2>
                        <div className="grid grid-cols-2 align-start">
                            {data.credits.filter((entry) => entry.superrole === 'Cast').map((entry) => {
                                return (
                                    <Fragment key={entry.id}>
                                        <div className="flex flex-row-reverse mx-[1rem]"><b>{entry.role}:</b></div>
                                        <div>{entry.name}</div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="w-1/7 rotate-90"/>
                    <div id="crew-container">
                        <h2 className="text-center">Crew</h2>
                        <div className="grid grid-cols-2 align-start">
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
                </div>
            </main>
        )
}