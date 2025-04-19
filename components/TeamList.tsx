'use client'
import { use } from 'react';
import Image from 'next/image';

export default function EmbeddedEpisode({
    team,
}: {
    team: Promise<Record<string, any>[]>
}) {
    const teamList = use(team);
    return (
        <ul id="team-list" className="flex flex-col list-none">
            {teamList.map((entry, index) => {
                const direction = index % 2 === 0 ? 'flex-row' : 'flex-row-reverse';
                return (
                <li key={entry.id} className={`flex ${direction}`}>
                    <Image
                        className=""
                        src={`/headshots/${entry.headshot_filename}`}
                        alt={`Image of ${entry.name}`}
                        width={300}
                        height={300}
                        priority
                    />
                    <div>
                        <div>
                            <div>{entry.name}</div>
                            <div>{entry.pronouns}</div>
                            <div>{entry.roles.join(", ")}</div>
                        </div>
                        <div>
                            {entry.bio}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            {entry.socials}
                        </div>
                        <div>
                            {entry.projects}
                        </div>
                        <div>
                            {entry.quote}
                        </div>
                    </div>
                </li>
                )
            })}
        </ul>
    )
}