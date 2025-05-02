import Image from "next/image";
import { Suspense } from "react";

// Local Image Imports
import SoulboundTextLogo from "@images/miscImages/SoulboundTextLogo.png"
import defaultCover from "@images/covers/episodes/defaultCover.jpg"

import EmbeddedEpisode from "@components/EmbeddedEpisode";
import ShowLinks from "@components/ShowLinks";
import { getLatestEp, getShowLinks } from "@lib/neonFunctions";

export default async function Home() {
    const latestEp = getLatestEp();
    const showLinks = getShowLinks();

    return (
        <main className="flex flex-col">
            <div id="top-banner" className="flex flex-row justify-center align-center p-[2em] bg-[url('/images/backgrounds/SpaceBannerSTATIC.png')]">
                <Image
                    className="h-[20em] w-auto"
                    src={SoulboundTextLogo}
                    alt="Space banner image"
                    priority
                />
            </div>
            <div id="whatis-section" className="flex flex-row align-center justify-around p-[1em] bg-cyan-300 border-[2em] border-image-[url('/images/borders/MetalScrewBorder.png')] border-slice-[990] border-image-width-[150px] border-repeat-round">
                <div id="podcast-description" className="flex flex-col justify-center m-[1em] w-1/3">
                    <h2>What is Soulbound?</h2>
                    Doctor Jaylin Glaslow is a well renowned historian aboard a space station known as the Deck. When he learns of robots who have begun to think and feel without the aid of AI or manmade devices, he is sent out to investigate why these robots have developed sentience through interviewing them on a desolate planet known as Last Stand, a place uninhabitable by organic life, but a great place for inorganic life to hide. Every week he interviews a new robot to learn about their planet and their past, hoping that maybe one day he’ll figure out what makes them work the way they do.
                </div>
                <Image
                    id="episode-cover"
                    className="h-[20em] w-auto mx-[5em]"
                    src={defaultCover}
                    alt="Soulbound Podcast cover art"
                />
            </div>
            <div id="latestep-section" className="flex flex-col align-center py-[2em] px-[10em] bg-[url('/images/backgrounds/MetalHeartBackground.png')] bg-size-[5em] bg-repeat border-[2em] border-image-[url('/images/borders/MetalHashBorder.png')] border-slice-t-[980] border-slice-r-[1000] border-slice-b-[990] border-slice-l-[1030] border-image-width-[150px] border-repeat-round">
                <h2>Latest Episode</h2>
                <Suspense fallback={
                    <iframe className="border-12" src="https://open.spotify.com/embed/episode/5qCdO8dR2aa7vhTfPO0CUV?utm_source=generator" width="100%" height="352" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                }>
                    <EmbeddedEpisode episode={latestEp}/>
                </Suspense>
            </div>
            <div id="keepingup-section" className="flex flex-col justify-center align-center p-[3em] bg-cyan-300 border-[2em] border-image-[url('/images/borders/MetalScrewBorder.png')] border-slice-[990] border-image-width-[150px] border-repeat-round">
                <h2>Keep up to date with us!</h2>
                <Suspense fallback={
                    <ul className="flex flex-row w-2/3 px-[2em] justify-between align-center list-none">
                        <li >Loading...</li>
                    </ul>
                }>
                    <ShowLinks links={showLinks}/>
                </Suspense>
            </div>
        </main>
    )
}