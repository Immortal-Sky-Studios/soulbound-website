import Image from "next/image";
import { getTeamList } from "../neonFunctions";

export default async function AboutUs() {
    const data = await getTeamList();
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
                    {data.map((member, index) => {
                        const direction = index % 2 === 0 ? 'flex-row' : 'flex-row-reverse';
                        return (
                        <li key={index} className={`flex ${direction}`}>
                            <Image
                                className=""
                                src="MEMBERIMAGEFILENAME"
                                alt={`Image of ${member.name}`}
                                width={300}
                                height={300}
                                priority
                            />
                            <div>
                                <div>
                                    <div>{member.name}</div>
                                    <div>{member.roles}</div>
                                </div>
                                <div>
                                    DESCRIPTION GOES HERE
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <ul>
                                    SOCIALS
                                </ul>
                                <ul>
                                    OTHER PROJECTS
                                </ul>
                                <p>
                                    FAV QUOTE
                                </p>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    )
}