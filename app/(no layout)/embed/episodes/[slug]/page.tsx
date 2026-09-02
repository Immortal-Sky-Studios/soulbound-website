import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEpisode, getLatestEp } from '@lib/neonFunctions.ts';
import EpisodeLinks from "@/components/EpisodeLinks";

export default async function EpisodeEmbed({
        params,
    }: {
        params: Promise<{ slug: string }>
    }) {
        var { slug } = await params;
        // handle special url case
        if ("latest_episode" == slug) {
            slug = await getLatestEp("episodes").then((response) => response.slug)
        }
        const data = await getEpisode(slug);
        if (!data?.id) {
            notFound(); // database returned that slug does not exist, redirect to 404 page
        }

        return (
            <main className="flex flex-col max-sm:items-center sm:flex-row h-[100vh] w-[100vw] p-[1rem] text-cyan-300 bg-[#4D4D4D] rounded-4xl">
                <Image
                    id="episode-cover"
                    className="h-auto sm:h-full w-3/4 sm:w-auto rounded-lg py-[0.5rem]"
                    src={`/images/covers/episodes/${data.cover_filename}`}
                    alt={data.cover_alt_text}
                    width={data.cover_width}
                    height={data.cover_height}
                    loading="eager"
                />
                <div id="right-section" className="flex flex-col justify-around px-[1rem] grow h-full">
                    <div id="episode-info-container" className="flex flex-col max-sm:items-center h-2/3">
                        <div id="episode-title" className="flex flex-row justify-between">
                            <Link href={`https://thesoulboundseries.com/episodes/${data.slug}`} target="_blank" rel="noopener noreferrer">
                                <h2 className="underline hover:no-underline">S{data.season_num}E{data.season_ep_num} - {data.title}</h2>
                            </Link>
                        </div>
                        <p id="episode-description" className="max-sm:text-center overflow-y-auto whitespace-pre-line">
                            {data.description.replace(/\\n/g,"\n")}
                        </p>
                    </div>
                    <ul id="showlinks-container" className="flex flex-row justify-around items-center py-[0.5rem] list-none">
                        <EpisodeLinks links={[data.link_spotify,data.link_apple,data.link_amazon]}/>
                    </ul>
                </div>
            </main>
        )
}