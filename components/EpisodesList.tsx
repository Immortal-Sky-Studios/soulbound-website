'use client'
import { ChangeEvent, use, useState } from 'react';
import ShowLinksList from './ShowLinks';
import Link from 'next/link';
import Image from 'next/image';
import { Stalinist_One } from "next/font/google";
import type { Selectable } from 'kysely';
import type { ShowLinks } from '@/kysely-types';

const stalinistOne = Stalinist_One({
    weight: "400",
    subsets: ['latin'],
});

export default function EpisodesList({
    episodes,
    links,
}: {
    episodes: Promise<{
        ep_num: number;
        slug: string;
        title: string;
        season_num: number;
        id: number;
    }[]>
    links: Promise<Selectable<ShowLinks>[]>
}) {
    const episodesList = use(episodes);

    const [searchItem, setSearchItem] = useState('');
    const [filteredEps, setFilteredEps] = useState(episodesList);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target?.value;
        setSearchItem(searchTerm);

        const filteredItems = episodesList.filter((entry) => 
            entry.title.toLowerCase().includes(searchItem.toLowerCase())
        );

        setFilteredEps(filteredItems);
    }

    return (
        <div id="center-container" className="flex flex-col align-center w-full md:w-1/2 h-full bg-background">
            <div id="main-header" className="flex flex-col align-center">
                <div className="flex flex-row justify-center">
                    <h1 className={`${stalinistOne.className} w-2/3 text-center mt-[0.5em]`}>EPISODES</h1>
                </div>
                <div className="flex flex-row justify-center -mt-[1.75em]">
                    <ShowLinksList links={links} />
                </div>
                <hr className="my-[1em]"/>
                <div id="search-container" className="flex flex-row justify-center mb-[1em]">
                    <Image
                        src="/images/icons/search-icon.svg"
                        alt="Search magnifying glass icon"
                        width={15}
                        height={15}
                        className="-mr-[1.25em]"
                    />
                    <input className="px-[1.5em] w-2/3 border-2" name="episode-search" type="text" placeholder="Search for an episode" defaultValue="" autoFocus={true} onChange={handleSearch} />
                </div>
            </div>
            <ul id="results-list" className="flex flex-col overflow-y-auto list-none h-[75vh]">
                {filteredEps.map((entry) => {
                    return (
                        <li key={entry.id} className="flex flex-row border">
                            <div className="flex flex-col justify-center align-center h-1/2 m-[1em] p-[0.25em] border-2">Season {entry.season_num}</div>
                            <Link href={`/episodes/${entry.slug}`} className="flex flex-col justify-center align-center text-3xl font-medium">Ep {entry.ep_num} {entry.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

