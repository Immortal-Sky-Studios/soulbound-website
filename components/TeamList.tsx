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
                <li key={entry.id} className={`flex flex-col ${direction ? "lg:flex-row" : "lg:flex-row-reverse"} max-lg:items-center border-2 p-[1rem] my-[1rem]`}>
                    <Image
                        className="object-contain border border-black"
                        src={`/images/headshots/${entry.headshot_filename}`}
                        alt={`Image of ${entry.name}`}
                        width={300}
                        height={300}
                        priority
                    />
                    <div className="">
                        <div className={`flex flex-col ${direction ? "md:flex-row" : "md:flex-row-reverse"}`}>
                            <h2 className="border px-[0.5rem] max-sm:mb-0">{entry.name} ({entry.pronouns})</h2>
                            <div className={`h-fit p-[0.25rem] border grow ${direction ? "text-start" : "text-end"}`}>{entry.roles.join(", ")}</div>
                        </div>
                        <div className={`flex flex-col ${direction ? "sm:flex-row" : "sm:flex-row-reverse"} sm:p-[0.5rem]`}>
                            <div className="mx-[1rem] max-sm:my-[1rem]">
                                {entry.bio}
                            </div>
                            <ul className="flex flex-col px-[2rem] py-[1rem] sm:mx-[0.5rem] list-disc border">
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