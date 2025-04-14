'use client'
import { ChangeEvent, use, useState } from 'react';
import ShowLinks from './ShowLinks';
import Link from 'next/link';

export default function EmbeddedEpisode({
    episodes,
    links,
}: {
    episodes: Promise<Record<string, any>[]>
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
        <main className="flex flex-row justify-items-center w-screen bg-[/StarryBG.gif]">
                <div id="center-container" className="flex flex-col w-1/2 h-full">
                    <div id="main-header" className="flex flex-col">
                        <h1>EPISODES</h1>
                        <ShowLinks links={links} />
                        <hr/>
                        <div id="search-container">
                            <input name="episode-search" type="text" placeholder="Search for an episode" defaultValue="" autoFocus={true} onChange={handleSearch} />
                        </div>
                    </div>
                    <ul id="results-list" className="flex flex-col overflow-scroll list-none">
                        {filteredEps.map((entry, index) => {
                            return (
                                <li key={index} className="flex flex-row">
                                    <div>Season {entry.season_num}</div>
                                    <h2><Link href={`/episodes/${entry.slug}`}>Ep {entry.ep_num} {entry.title}</Link></h2>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </main>
    )
}

