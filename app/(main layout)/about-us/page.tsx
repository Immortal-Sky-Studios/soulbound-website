import type { Metadata } from 'next';
import { Suspense } from "react";
import Image from 'next/image';

import defaultCover from "@images/covers/episodes/defaultCover.jpg";

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
            <div id="aboutus-container" className="flex flex-row justify-between p-[2em]">
                <div id="left-art" className="flex flex-col justify-center items-center">
                    <Image
                        id="episode-cover"
                        className=""
                        src={defaultCover}
                        alt="ALTTEXT"
                        width={250}
                        height={250}
                    />
                </div>
                <div id="description-container" className="flex flex-col justify-center items-center w-1/3">
                    <h1 className="text-center underline">ABOUT US</h1>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                </div>
                <div id="right-art" className="flex flex-col justify-center items-center">
                    <Image
                        id="episode-cover"
                        className=""
                        src={defaultCover}
                        alt="ALTTEXT"
                        width={250}
                        height={250}
                    />
                </div>
            </div>
            <div id="meettheteam-container" className="border-y-4 px-[5rem] bg-[/AboutUsBG.png]">
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
            <div id="conceptgallery-container">
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