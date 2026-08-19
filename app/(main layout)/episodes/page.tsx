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
    const episodes = getEpisodeList('desc');
    const showLinks = getShowLinks('Podcast Hosts');

    return (
        <main className="flex flex-row justify-center w-full bg-[url('/images/backgrounds/SpaceBannerSTATIC.png')]">
            <div id="center-container" className="flex flex-col w-full md:w-fit h-full bg-background border-x-[1rem] border-image-[url('/images/borders/RivetSideBorderX.png')] border-slice-[40] border-image-width-l-[1rem] border-image-width-r-[1rem] border-repeat-round">
                <div id="main-header" className="flex flex-col">
                    <div className="flex flex-row justify-center mx-[2rem]">
                        <h1 className={`${stalinistOne.className} w-fit px-[1rem] text-center mt-[0.5rem] border-[1rem] border-image-[url('/images/borders/RivetCornerBorder.png')] border-slice-[43] border-image-width-[1rem] border-repeat-round`}>EPISODES</h1>
                    </div>
                    <div className="flex flex-row justify-center">
                        <ShowLinksList links={showLinks} />
                    </div>
                    <hr className="my-[1rem]"/>
                </div>
                <EpisodesList episodes={episodes}/>
            </div>
        </main>
    )
}