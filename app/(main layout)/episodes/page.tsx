import type { Metadata } from 'next';
import { Suspense } from 'react'

import EpisodesList from "@components/EpisodesList";
import { getEpisodeList, getShowLinks } from "@lib/neonFunctions";

export const metadata: Metadata = {
    title: 'Episodes',
};

export default function Episodes() {
    const episodes = getEpisodeList();
    const showLinks = getShowLinks('Podcast Hosts');

    return (
        <main className="flex flex-row justify-center w-screen bg-[url('/backgrounds/SpaceBannerSTATIC.png')]">
            <Suspense fallback={
                <div id="center-container" className="flex flex-col align-center w-1/2 h-full bg-background">
                    <div id="main-header" className="flex flex-col align-center">
                        <div className="flex flex-row justify-center">
                            <h1 className="w-2/3 text-center">EPISODES</h1>
                        </div>
                        <div className="flex flex-row justify-center">
                            <ul className="flex flex-row w-2/3 px-[2em] justify-between align-center list-none">
                                <li>Loading...</li>
                            </ul>
                        </div>
                        <hr className="my-[1em]"/>
                        <div id="search-container" className="flex flex-row justify-center mb-[1em]">
                            <input className="w-2/3" name="episode-search" type="text" placeholder="Loading..." defaultValue="" autoFocus={true} />
                        </div>
                    </div>
                    <ul id="results-list" className="overflow-scroll list-none">
                        Loading...
                    </ul>
                </div>
            }>
                <EpisodesList episodes={episodes} links={showLinks}/>
            </Suspense>
        </main>
    )
}