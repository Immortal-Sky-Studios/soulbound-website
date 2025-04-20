import { Suspense } from "react";
import Image from 'next/image';

import ConceptGallery from "@components/ConceptGallery";
import TeamList from "@components/TeamList";
import { getTeamList, getConceptArt } from "@lib/neonFunctions";

export default function AboutUs() {
    const teamList = getTeamList();
    const conceptArt = getConceptArt();

    return (
        <main>
            <div id="aboutus-container" className="flex flex-row justify-between">
                <div id="left-art" className="p-25">
                    <Image
                        id="episode-cover"
                        className=""
                        src="/covers/episodes/defaultCover.jpg"
                        alt="ALTTEXT"
                        width={250}
                        height={250}
                    />
                </div>
                <div id="description-container" className="p-[1em]">
                    <h1>ABOUT US</h1>
                    <p>Description goes here.</p>
                </div>
                <div id="right-art" className="p-25">
                    <Image
                        id="episode-cover"
                        className=""
                        src="/covers/episodes/defaultCover.jpg"
                        alt="ALTTEXT"
                        width={250}
                        height={250}
                    />
                </div>
            </div>
            <div id="meettheteam-container" className="bg-[/AboutUsBG.png]">
                <h2>Meet the Team!</h2>
                <Suspense fallback={
                    <ul id="team-list" className="flex flex-col list-none">
                        Loading...
                    </ul>
                }>
                    <TeamList team={teamList} />
                </Suspense>
            </div>
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
        </main>
    )
}