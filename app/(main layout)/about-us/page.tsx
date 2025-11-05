import type { Metadata } from 'next';
import { Suspense } from "react";
import Image from 'next/image';

import leftSquare from '@images/misc/AboutUsLeftSquare.png';
import rightSquare from '@images/misc/AboutUsRightSquare.png';

import ConceptGallery from "@components/ConceptGallery";
import TeamList from "@components/TeamList";
import { getTeamList, getConceptArt } from "@lib/neonFunctions";

export const metadata: Metadata = {
    title: 'About Us',
    alternates: {
        canonical: './about-us',
    },
};

export default function AboutUs() {
    const teamList = getTeamList();
    const conceptArt = getConceptArt(10);

    return (
        <main>
            <div id="aboutus-container" className="flex flex-col lg:flex-row justify-center items-center p-[2em] text-cyan-300 bg-[url('/images/backgrounds/SpaceBannerSTATIC.png')]">
                <div id="left-art" className="flex flex-col justify-center items-center max-md:my-[0.5rem]">
                    <Image
                        id="episode-cover"
                        className="object-contain h-[30rem] w-auto"
                        src={leftSquare}
                        alt="Doctor Buttons, Null N Void, K-FED, Cal, and Jaylin Glaslow chilling and chatting together"
                    />
                </div>
                <div id="description-container" className="flex flex-col justify-center items-center mx-[3rem] max-lg:order-last md:w-1/3">
                    <h1 className="text-center text-[5rem] font-bold">ABOUT US</h1>
                    <p className="text-center">
                        Hi, Olivia Jeske here, Type 1 Diabetic and creator of Soulbound. For those of you who haven&apos;t figured it out yet, Soulbound is a show about characters with disabilities fighting for their own survival. It started with three monologues I wrote in my free time to vent about different aspects of my own disability, those being the monologues of Maybelle, Null, and Buttons, and it spiraled from there. 

                        Soulbound is about robots because that&apos;s all the representation I had. As far as disabled characters in media goes, there aren&apos;t many with chronic conditions that are dependent on prescription medications. Hell, the best type 1 diabetic representation out there is in South Park. Robots in science fiction have always been the closest thing out there to good ace and disabled rep, and they&apos;re always poorly written side characters who&apos;s sole narrative revolves around whether or not they&apos;re really people at all. That always hurt.

                        In March of 2024, I was tasked with creating a podcast for a college course, I scrounged up those three monologues, developed them into full characters, threw in some old OC&apos;s, and dragged my best friend from high school and my girlfriend into a recording booth to do silly robot voices together. We published our first episode a few days after my 9 year diagnosis anniversary.

                        Over time, I dragged more and more people into it. Friends, Acquaintances, Dungeon Masters, and those who just wanted to tell a good story. And now... here we are. A veritable volunteer army. I have the honor of editing together our voices to help tell a story I was never told. I get to create the representation I never had. I get to write about depressed characters who get to be happy, characters with chronic pain who get to be seen and treated, and I can edit the clicking of my insulin pump into the podcast and make you all realize how annoying it is to hear constantly! But really, I&apos;m just lucky everyone has been willing to listen.

                        I hope you have good luck out there too.
                    </p>
                </div>
                <div id="right-art" className="flex flex-col justify-center items-center max-md:my-[0.5rem]">
                    <Image
                        id="episode-cover"
                        className="object-contain h-[30rem] w-auto"
                        src={rightSquare}
                        alt="Jeri Gander, Gwydion Jormund, Mason, and Figaro Tele sitting together in pleasant company"
                    />
                </div>
            </div>
            <div id="meettheteam-container" className="sm:px-[5rem] bg-[url('/images/backgrounds/AboutUsStarryBackground.png')] border-y-[1.9rem] border-image-[url('/images/borders/RivetSideBorderY.png')] border-slice-[157] border-image-width-[2rem] border-repeat-round">
                <div id="team-center-section" className="flex flex-col justify-center items-stretch p-[1rem] bg-[#757575] border-x-4 border-cyan-300">
                    <h2 className="mx-[30%] text-center -mt-[1rem] text-[4rem] text-[#414042] font-bold">Meet the Team!</h2>
                    <Suspense fallback={
                        <ul id="team-list" className="flex flex-col list-none">
                            Loading...
                        </ul>
                    }>
                        <TeamList team={teamList} />
                    </Suspense>
                </div>
            </div>
            <div id="conceptgallery-container" className="flex flex-col items-center">
                <h2 className="text-center text-[4rem] text-[#414042]">Concept Art Gallery</h2>
                <Suspense fallback={
                    <div id="conceptgallery-container">
                        <h2>Concept Art Gallery</h2>
                        <div id="concept-gallery">
                            Loading...
                        </div>
                    </div>
                }>
                    <ConceptGallery art={conceptArt} />
                </Suspense>
            </div>
        </main>
    )
}