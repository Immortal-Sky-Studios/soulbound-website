import { Suspense } from "react";

import ConceptGallery from "@components/ConceptGallery";
import TeamList from "@components/TeamList";
import { getTeamList, getConceptArt } from "@lib/neonFunctions";

export default function AboutUs() {
    const teamList = getTeamList();
    const conceptArt = getConceptArt();

    return (
        <main>
            <div id="aboutus-container">
                <div id="left-art"></div>
                <div id="description-container"></div>
                <div id="right-art"></div>
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