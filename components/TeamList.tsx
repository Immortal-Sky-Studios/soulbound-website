'use client'
import { use } from 'react';
import Image from 'next/image';
import { getTeamList } from '@/lib/neonFunctions';

export default function EmbeddedEpisode({
    team,
}: {
    team: ReturnType<typeof getTeamList>
}) {
    const teamList = use(team);
    return (
        <ul id="team-list" className="flex flex-col list-none">
            {teamList.map((entry, index) => {
                const direction = index % 2 === 0 ? false : true;
                return (
                <li key={entry.id} className={`flex flex-col ${direction ? "lg:flex-row" : "lg:flex-row-reverse"} max-lg:items-center p-[1rem] my-[1rem] bg-[#949494] border-[1rem] border-image-[url('/images/borders/MetalHashBorder.png')] border-slice-t-[980] border-slice-r-[1000] border-slice-b-[990] border-slice-l-[1030] border-image-width-[4rem] border-repeat-round`}>
                    <Image
                        className="object-contain bg-[url('/images/backgrounds/MetalHeartBackground.png')] bg-size-[4rem] bg-repeat border-[1rem] border-image-[url('/images/borders/ThreeRivetBorder.png')] border-slice-[180] border-image-width-[1rem] border-repeat-round"
                        src={`/images/headshots/${entry.headshot_filename}`}
                        alt={`Image of ${entry.name}`}
                        width={300}
                        height={300}
                        priority
                    />
                    <div className="grow">
                        <div className={`flex flex-col ${direction ? "items-start" : "items-end"}`}>
                            <h2 className={`px-[0.5rem] mb-0 w-1/2 ${direction ? "text-start" : "text-end"} bg-cyan-300`}>{entry.name} ({entry.pronouns})</h2>
                            <div className={`h-fit p-[0.25rem] w-5/12 ${direction ? "text-start" : "text-end"} text-[#949494] bg-[#414042]`}>{entry.jobs.length == 0 ? "Upcoming Team Member" : entry.jobs.join(", ")}</div>
                            {entry.roles.length != 0 && <div className={`h-fit p-[0.25rem] mb-[1rem] w-2/6 ${direction ? "text-start" : "text-end"} text-[#949494] bg-[#525053]`}><b>Roles:</b> {entry.roles.join(", ")}</div>}
                        </div>
                        <div className="flex flex-col justify-center items-center sm:p-[0.5rem]">
                            <div className="w-1/2 mx-[1rem] my-[1rem]">
                                {entry.bio}
                            </div>
                            <ul className="flex flex-col w-1/2 px-[2rem] py-[1rem] sm:mx-[0.5rem] list-disc border">
                                <li>
                                    {entry.socials}
                                </li>
                                <li>
                                    {entry.projects}
                                </li>
                                <li>
                                    {entry.quote}
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                )
            })}
        </ul>
    )
}