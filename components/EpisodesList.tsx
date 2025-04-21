'use client'
import { ChangeEvent, use, useState } from 'react';
import ShowLinks from './ShowLinks';
import Link from 'next/link';

export default function EmbeddedEpisode({
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
    links: Promise<Record<string, any>[]>
}) {
    const episodesList = use(episodes);

    const [searchItem, setSearchItem] = useState('');
    const [filteredEps, setFilteredEps] = useState(episodesList);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target?.value;
        setSearchItem(searchTerm);

        const filteredItems = episodesList.filter((entry) => 
            entry.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredEps(filteredItems);
    }

    return (
        <div id="center-container" className="flex flex-col align-center w-1/2 h-full bg-background">
            <div id="main-header" className="flex flex-col align-center">
                <div className="flex flex-row justify-center">
                    <h1 className="w-2/3 text-center">EPISODES</h1>
                </div>
                <div className="flex flex-row justify-center">
                    <ShowLinks links={links} />
                </div>
                <hr className="my-[1em]"/>
                <div id="search-container" className="flex flex-row justify-center mb-[1em]">
                    <input className="w-2/3" name="episode-search" type="text" placeholder="Search for an episode" defaultValue="" autoFocus={true} onChange={handleSearch} />
                </div>
            </div>
            <ul id="results-list" className="flex flex-col overflow-scroll list-none">
                {filteredEps.map((entry) => {
                    return (
                        <li key={entry.id} className="flex flex-row">
                            <div>Season {entry.season_num}</div>
                            <h2><Link href={`/episodes/${entry.slug}`}>Ep {entry.ep_num} {entry.title}</Link></h2>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

