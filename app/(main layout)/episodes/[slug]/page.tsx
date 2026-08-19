import type { Metadata } from 'next'
import Image from "next/image";
import Link from "next/link";
import { Fragment } from 'react';
import { notFound } from 'next/navigation';

import { getEpisode, getNearbyEp } from '@lib/neonFunctions.ts';
import EpisodeLinks from '@/components/EpisodeLinks';
import Transcript from '@/components/Transcript';
import EmbedButton from '@/components/EmbedButton';
import EmbeddedEpisode from "@components/EmbeddedEpisode";

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

function compareCredits(
    a: {
        role: string;
        superrole: string;
        id: number;
        name: string;
    },
    b: {
        role: string;
        superrole: string;
        id: number;
        name: string;
    }) {
        const rankings: { [char: string]: number } = {
            "Writer": 1,
            "Assistant Writer": 2,
            "Editor": 3,
            "Director": 4
        }

        const a_rank = rankings[a.role] || 100;
        const b_rank = rankings[b.role] || 100;

        return a_rank - b_rank;
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

        data.credits.sort(compareCredits);

        const prevEp = await getNearbyEp(data.season_ep_num ? "season" : "ep", (data.season_ep_num || data.ep_num) - 1);
        const nextEp = await getNearbyEp(data.season_ep_num ? "season" : "ep", (data.season_ep_num || data.ep_num) + 1);
        const spotifyComponents = data.link_spotify.split('episode');

        return (
            <main className="min-h-screen w-full p-[2rem]">
                <div id="top-section" className="flex flex-col md:flex-row justify-center">
                    <div id="left-section" className="flex flex-col sm:max-md:flex-row items-center md:items-start md:mx-[1rem] max-md:mb-[1rem]">
                        <Image
                            id="episode-cover"
                            className="h-auto md:h-[300px] w-full md:w-auto sm:max-md:w-1/2 sm:max-md:h-auto"
                            src={`/images/covers/episodes/${data.cover_filename}`}
                            alt={data.cover_alt_text}
                            width={data.cover_width}
                            height={data.cover_height}
                            loading="eager"
                        />
                        <div className="flex flex-col items-center w-full max-md:mx-[1rem]">
                            <iframe title="spotifyPlayer" className="w-full md:w-[300px] h-[160px] md:h-[152px] my-[1rem]" src={`${spotifyComponents[0]}embed/episode/${spotifyComponents[1]}?utm_source=generator`} width="100%" height="352" loading="lazy"></iframe>
                            <ul id="showlinks-container" className="flex flex-row justify-around items-center w-full mb-[1rem] sm:mb-0">
                                <EpisodeLinks links={[data.link_spotify,data.link_apple,data.link_amazon]}/>
                                <EmbedButton embedStr={`<iframe style="border-radius:12px;overflow:hidden" src="https://thesoulboundseries.com/embed/episodes/${data.slug}" width="100%" height="300" frameBorder="0" loading="lazy"></iframe>`}/>
                            </ul>
                        </div>
                    </div>
                    <div id="right-section" className="flex flex-col items-stretch align-start grow">
                        <div id="episode-info-container" className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <h2 className="w-1/2 lg:w-1/3 px-[1rem] bg-cyan-300 border-x-4 border-t-4 border-[#414042]">Season {data.season_num}</h2> {/* mask-[url(/images/masks/season-mask.svg)] */}
                                <div id="prev-next-container" className="pt-[0.5em]">
                                    {prevEp && <Link href={`/episodes/${prevEp?.slug}`} className="h-min px-[1em] py-[0.25rem] bg-cyan-300 border border-[#414042]">{'<'} Prev</Link>}
                                    {nextEp && <Link href={`/episodes/${nextEp?.slug}`} className="h-min px-[1em] py-[0.25rem] bg-cyan-300 border border-[#414042]">Next {'>'}</Link>}
                                </div>
                            </div>
                            <div id="episode-info" className="flex flex-col justify-center text-shadow-md text-shadow-white/50 bg-[url('/images/backgrounds/MetalHeartBackground.png')] bg-size-[4rem] bg-repeat border-4 border-[#414042] -mt-[1rem] p-[1rem]">
                                <h2 className="text-center underline">{data.season_ep_num && `Soulbound Ep. ${data.season_ep_num} -`} {data.title}</h2>
                                <p id="episode-description" className="max-h-[4rem] text-center mb-[1rem] whitespace-pre-line overflow-y-auto">{data.description.replace(/\\n/g,"\n")}</p>
                                <p id="trigger-warnings" className="max-h-[4rem] text-center whitespace-pre-line overflow-y-auto"><b>Trigger Warnings:</b> <br/> {data.triggers.replace(/\\n/g,"\n")}</p>
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
                <div id="credits-container" className="flex flex-col md:flex-row justify-around items-center min-h-[15rem] mt-[1rem] p-[0.5rem] md:p-[1rem] bg-cyan-300 text-blue-700 border-[1rem] border-image-[url('/images/borders/ThreeRivetBorder.png')] border-slice-[43] border-image-width-[1rem] border-repeat-round">
                    <div id="cast-container" className="max-md:mb-[1rem]">
                        <h2 className="text-center">Cast</h2>
                        {data.credits.length ? 
                            <div className="grid grid-cols-2 align-start">
                                {data.credits.filter((entry) => entry.superrole === 'Cast').map((entry) => {
                                    return (
                                        <Fragment key={entry.id}>
                                            <div className="flex flex-row-reverse items-center text-right mr-[1rem]"><b>{entry.role}:</b></div>
                                            <div className="flex flex-row items-center text-left">{entry.name}</div>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        : "Coming Soon..."}
                    </div>
                    <hr className="w-[10rem] md:mr-[5rem] md:rotate-90"/>
                    <div id="crew-container" className="max-md:mt-[0.5rem]">
                        <h2 className="text-center">Crew</h2>
                        {data.credits.length ? 
                            <div className="grid grid-cols-2 align-start">
                                {data.credits.filter((entry) => entry.superrole === 'Crew').map((entry) => {
                                    return (
                                        <Fragment key={entry.id}>
                                            <div className="flex flex-row-reverse items-center text-right mr-[1rem]"><b>{entry.role}:</b></div>
                                            <div className="flex flex-row items-center text-left">{entry.name}</div>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        : "Coming Soon..."}
                    </div>
                </div>
            </main>
        )
}