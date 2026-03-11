import Image from "next/image";

// Local Image Imports
import SoulboundTextLogo from "@images/misc/SoulboundTextLogo.png"
import defaultCover from "@images/covers/episodes/defaultCover.jpg"

import EmbeddedEpisode from "@components/EmbeddedEpisode";
import ShowLinks from "@components/ShowLinks";
import { getEpisode, getLatestEp, getShowLinks } from "@lib/neonFunctions";
import Link from "next/link";
import Announcement from "@/components/Announcement";

export default function Home() {
    const showLinks = getShowLinks();

    const latestEp = getLatestEp('episodes');
    const latestAnnounce = getLatestEp('announcements');

    return (
        <main className="flex flex-col">
            <div id="top-banner" className="flex flex-row justify-center items-center p-[2rem] bg-[url('/images/backgrounds/SpaceBannerSTATIC.png')]">
                <Image
                    className="sm:h-[20rem] w-auto"
                    src={SoulboundTextLogo}
                    alt="Space banner image"
                    priority
                />
            </div>
            <Announcement latestEp={latestEp} latestAnnounce={latestAnnounce}/>
            <div id="whatis-section" className="flex flex-col xl:flex-row items-center justify-around py-[2rem] px-[2rem] xl:px-[10rem] bg-cyan-300 border-[2rem] border-image-[url('/images/borders/MetalScrewBorder.png')] border-slice-[990] border-image-width-[150px] border-repeat-round">
                <div id="podcast-description" className="flex flex-col justify-center xl:w-1/3">
                    <h2>What is Soulbound?</h2>
                    <p>
                        When robots across the known galaxy begin to develop sentience, the Astral Assembly sends their most disposable highest ranked historical officer, Dr Jaylin Glaslow, to investigate. When he&apos;s not conducting interviews and prying into the personal lives of his robotic hosts, Dr Glaslow spends his time learning more about political history and editing screenplays.
                        In other words, Soulbound is a Science Fiction Audio Drama Podcast about sentient robots and what makes us truly human. Or, hominid. Or, Fleshbag. Depending on who you ask.
                        <br/><br/>
                        We&apos;re published under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License, which means you&apos;re free to repost audio from our podcast and make fan content so long as you don&apos;t claim you made the podcast itself and you don&apos;t profit off the work. 
                        We ask you not use any of our audio, scripts, or art to train any form of artificial intelligence. Despite it&apos;s subject matter, we never use Artificial Intelligence to make any of our content. 100% human made content, that&apos;s our guarantee.
                        If you&apos;d like to get in touch with us, feel free to reach out to us at <Link className="underline inline" href="mailto:thesoulboundseries@gmail.com" target="_blank">thesoulboundseries@gmail.com</Link>
                    </p>
                </div>
                <Image
                    id="episode-cover"
                    className="h-[25rem] w-auto object-contain m-[2rem] rounded-lg"
                    src={defaultCover}
                    alt="Soulbound Podcast cover art"
                />
            </div>
            <div id="latestep-section" className="flex flex-col py-[2rem] px-[2rem] lg:px-[10rem] bg-[url('/images/backgrounds/MetalHeartBackground.png')] bg-size-[5rem] bg-repeat border-[2rem] border-image-[url('/images/borders/MetalHashBorder.png')] border-slice-t-[980] border-slice-r-[1000] border-slice-b-[990] border-slice-l-[1030] border-image-width-[150px] border-repeat-round">
                <h2 className="text-center">Latest Episode</h2>
                <div className="flex flex-row justify-center items-center w-full">
                    <EmbeddedEpisode episode={latestEp}/>
                </div>
            </div>
            <div id="keepingup-section" className="flex flex-col justify-center items-center bg-cyan-300 border-[2rem] border-image-[url('/images/borders/MetalScrewBorder.png')] border-slice-[990] border-image-width-[150px] border-repeat-round">
                <h2 className="text-center">Keep up to date with us!</h2>
                <ShowLinks links={showLinks}/>
            </div>
        </main>
    )
}