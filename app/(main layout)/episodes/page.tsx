import { Suspense } from 'react'

import EpisodesList from "@components/EpisodesList";
import { getEpisodeList, getShowLinks } from "@lib/neonFunctions";

export default function Episodes() {
    const episodes = getEpisodeList();
    const showLinks = getShowLinks('Podcast Hosts');

    return (
        <Suspense fallback={
            <main className="flex flex-row justify-items-center w-screen bg-[/StarryBG.gif]">
                <div id="center-container" className="flex flex-col w-0.5 h-full">
                    <div id="main-header" className="flex flex-col">
                        <h1>EPISODES</h1>
                        <ul className="flex flex-row w-2/3 px-[2em] justify-between align-center list-none">
                            <li>Loading...</li>
                        </ul>
                        <hr/>
                        <div id="search-container">
                            <input name="episode-search" type="text" placeholder="Loading..." defaultValue="" autoFocus={true} />
                        </div>
                    </div>
                    <ul id="results-list" className="overflow-scroll list-none">
                        Loading...
                    </ul>
                </div>
            </main>
        }>
            <EpisodesList episodes={episodes} links={showLinks}/>
        </Suspense>
    )
}