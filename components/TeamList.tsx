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
                const direction = index % 2 === 0 ? 'flex-row' : 'flex-row-reverse';
                return (
                <li key={entry.id} className={`flex flex-col sm:flex-row border-2 p-[1rem] my-[1rem]`}>
                    <Image
                        className={`object-contain border border-black ${index % 2 === 0 ? "" : "order-last"}`}
                        src={`/images/headshots/${entry.headshot_filename}`}
                        alt={`Image of ${entry.name}`}
                        width={300}
                        height={300}
                        priority
                    />
                    <div className={`${index % 2 === 0 ? "" : "order-first"}`}>
                        <div className={`flex ${direction}`}>
                            <h2 className="border px-[0.5rem]">{entry.name} ({entry.pronouns})</h2>
                            <div className="w-auto h-1/3 p-[0.25rem] border">{entry.roles.join(", ")}</div>
                        </div>
                        <div className={`flex ${direction} p-[0.5rem]`}>
                            <div className="mx-[1rem]">
                                {entry.bio}
                            </div>
                            <ul className="flex flex-col px-[2rem] py-[1rem] mx-[0.5rem] list-disc border">
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