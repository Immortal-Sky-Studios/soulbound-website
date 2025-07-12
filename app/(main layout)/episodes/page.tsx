import type { Metadata } from 'next';
import { Stalinist_One } from "next/font/google";

import EpisodesList from "@components/EpisodesList";
import ShowLinksList from '@components/ShowLinks';
import { getEpisodeList, getShowLinks } from "@lib/neonFunctions";

const stalinistOne = Stalinist_One({
    weight: "400",
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Episodes',
    alternates: {
        canonical: './episodes',
    },
};

export default function Episodes() {
    const episodes = getEpisodeList();
    const showLinks = getShowLinks('Podcast Hosts');

    return (
        <main className="flex flex-row justify-center w-full bg-[url('/images/backgrounds/SpaceBannerSTATIC.png')]">
            <div id="center-container" className="flex flex-col align-center w-full md:w-1/2 h-full bg-background">
                <div id="main-header" className="flex flex-col align-center">
                    <div className="flex flex-row justify-center">
                        <h1 className={`${stalinistOne.className} w-2/3 text-center mt-[0.5em]`}>EPISODES</h1>
                    </div>
                    <div className="flex flex-row justify-center -mt-[1.75em]">
                        <ShowLinksList links={showLinks} />
                    </div>
                    <hr className="my-[1em]"/>
                </div>
                <EpisodesList episodes={episodes}/>
            </div>
        </main>
    )
}