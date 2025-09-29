import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEpisode } from '@lib/neonFunctions.ts';
import EpisodeLinks from "@/components/EpisodeLinks";

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
                <Image
                    id="episode-cover"
                    className="h-full w-auto rounded-lg py-[0.5rem]"
                    src={`/images/covers/episodes/${data.cover_filename}`}
                    alt={data.cover_alt_text}
                    width={data.cover_width}
                    height={data.cover_height}
                    priority
                />
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
                        <EpisodeLinks links={[data.link_spotify,data.link_apple,data.link_amazon]}/>
                    </ul>
                </div>
            </main>
        )
}