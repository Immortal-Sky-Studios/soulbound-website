'use client'
import { ChangeEvent, use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getEpisodeList } from '@/lib/neonFunctions';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';


export default function EpisodesList({
    episodes,
}: {
    episodes: ReturnType<typeof getEpisodeList>
}) {
    const episodesList = use(episodes);

    const [searchItem, setSearchItem] = useState('');
    const filteredEps = episodesList.filter((entry) => 
            entry.title.toLowerCase().includes(searchItem.toLowerCase())
        );

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target?.value);
    }

    return (
        <>
            <div id="search-container" className="flex flex-row justify-center mb-[1rem]">
                <Image
                    src="/images/icons/search-icon.svg"
                    alt="Search magnifying glass icon"
                    width={15}
                    height={15}
                    className="-mr-[1.25rem]"
                />
                <input className="px-[1.5rem] w-2/3 border-2 border-[#58595b]" name="episode-search" type="text" placeholder="Search for an episode" defaultValue="" autoFocus={true} onChange={handleSearch} />
            </div>
            <ul id="results-list" className="flex flex-col overflow-y-auto list-none h-[75vh] border-t-1">
                {!filteredEps?.length ? <Skeleton count={10}/> : filteredEps.map((entry) => {
                    return (
                        <li key={entry.id} className="flex flex-row border">
                            <div className="flex flex-col justify-center items-center text-center h-1/2 m-[1rem] p-[0.25rem] border-2 border-[#58595b]">Season {entry.season_num}</div>
                            <Link href={`/episodes/${entry.slug}`} className="flex flex-col justify-center items-center text-3xl font-medium">{entry.season_ep_num && `Ep ${entry.season_ep_num}`} {entry.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

