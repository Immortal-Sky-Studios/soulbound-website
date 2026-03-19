'use client'
import { ChangeEvent, use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

import SearchIcon from '@images/icons/search-icon.svg';
import { getEpisodeList } from '@/lib/neonFunctions';

export default function EpisodesList({
    episodes,
}: {
    episodes: ReturnType<typeof getEpisodeList>
}) {
    const episodesList = use(episodes);

    const [searchItem, setSearchItem] = useState('');
    const filteredEps = episodesList.filter((entry) => 
            entry.title.toLowerCase().includes(searchItem.toLowerCase()) || entry.season_ep_num == Number(searchItem)
        );

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target?.value);
    }

    return (
        <>
            <div id="search-container" className="flex flex-row justify-center items-center mb-[1rem]">
                <Image
                    src={SearchIcon}
                    alt="Search magnifying glass icon"
                    className="h-[1rem] w-auto -mr-[1.25rem] z-2"
                />
                <input className="px-[1.5rem] w-2/3 border-2 border-[#58595b] bg-cyan-300" name="episode-search" type="text" placeholder="Search by title or episode number" defaultValue="" autoFocus={true} onChange={handleSearch} />
            </div>
            <ul id="results-list" className="flex flex-col overflow-y-auto list-none md:w-[45rem] h-[75vh] border-t-1">
                {!filteredEps?.length ? <Skeleton count={10}/> : filteredEps.map((entry) => {
                    return (
                        <li key={entry.id} className="border bg-cyan-300">
                            <Link href={`/episodes/${entry.slug}`} className="flex flex-row w-full h-full">
                                <div className="flex flex-col justify-center items-center text-center h-1/2 m-[1rem] p-[0.25rem] border-2 border-[#58595b]">Season {entry.season_num}</div>
                                <div className="flex flex-col justify-center items-center text-3xl font-medium">{entry.season_ep_num && `Ep ${entry.season_ep_num}`} {entry.title}</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

