import Image from "next/image";
import { getTeamList, getConceptArt } from "@lib/neonFunctions";

export default async function AboutUs() {
    const teamList = await getTeamList();
    const conceptArt = await getConceptArt();

    const plusSlides = () => {
        // magic happens
    }
    const minusSlides = () => {
        // magic happens
    }

    return (
        <main>
            <div id="aboutus-container">
                <div id="left-art"></div>
                <div id="description-container"></div>
                <div id="right-art"></div>
            </div>
            <div id="meettheteam-container" className="bg-[/AboutUsBG.png]">
                <h2>Meet the Team!</h2>
                <ul id="team-list" className="flex flex-col list-none">
                    {teamList.map((member, index) => {
                        const direction = index % 2 === 0 ? 'flex-row' : 'flex-row-reverse';
                        return (
                        <li key={index} className={`flex ${direction}`}>
                            <Image
                                className=""
                                src={`/headshots/${member.headshot_filename}`}
                                alt={`Image of ${member.name}`}
                                width={300}
                                height={300}
                                priority
                            />
                            <div>
                                <div>
                                    <div>{member.name}</div>
                                    <div>{member.pronouns}</div>
                                    <div>{member.roles}</div>
                                </div>
                                <div>
                                    {member.bio}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <ul>
                                    {member.socials}
                                </ul>
                                <ul>
                                    {member.projects}
                                </ul>
                                <p>
                                    {member.quote}
                                </p>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </div>
            <div id="conceptgallery-container">
                <h2>Concept Art Gallery</h2>
                <div id="concept-gallery">
                    {conceptArt.map((entry,index) => (
                        <div key={index}>
                            <div>{index + 1} / {conceptArt.length}</div>
                            <Image
                                className=""
                                src={`/concept-art/${entry.filename}`}
                                alt={entry.alt_text}
                                width={300}
                                height={300}
                                priority
                            />
                            <div>{entry.caption}</div>
                        </div>
                    ))}
                    
                </div>
                
                <a id="prev-button" onClick={minusSlides}>&#10094;</a>
                <a id="next-button" onClick={plusSlides}>&#10095;</a>
            </div>
        </main>
    )
}