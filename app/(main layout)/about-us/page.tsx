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
            <div id="aboutus-container" className="flex flex-col lg:flex-row justify-center items-center p-[2em]">
                <div id="left-art" className="flex flex-col justify-center items-center max-md:my-[0.5rem]">
                    <Image
                        id="episode-cover"
                        className="object-contain h-[20rem] w-auto"
                        src={leftSquare}
                        alt="Doctor Buttons, Null N Void, K-FED, Cal, and Jaylin Glaslow chilling and chatting together"
                    />
                </div>
                <div id="description-container" className="flex flex-col justify-center items-center mx-[3rem] max-lg:order-last md:w-1/3">
                    <h1 className="text-center underline">ABOUT US</h1>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                </div>
                <div id="right-art" className="flex flex-col justify-center items-center max-md:my-[0.5rem]">
                    <Image
                        id="episode-cover"
                        className="object-contain h-[20rem] w-auto"
                        src={rightSquare}
                        alt="Jeri Gander, Gwydion Jormund, Mason, and Figaro Tele sitting together in pleasant company"
                    />
                </div>
            </div>
            <div id="meettheteam-container" className="border-y-4 sm:px-[5rem] bg-[/AboutUsBG.png]">
                <div id="team-center-section" className="flex flex-col justify-center items-stretch border-x-4 p-[1rem]">
                    <h2 className="mx-[30%] text-center -mt-[1rem] border-2">Meet the Team!</h2>
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
                <h2 className="text-center underline">Concept Art Gallery</h2>
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