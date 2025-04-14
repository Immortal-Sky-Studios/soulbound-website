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
                            <div>{member.roles.join(", ")}</div>
                        </div>
                        <div>
                            {member.bio}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            {member.socials}
                        </div>
                        <div>
                            {member.projects}
                        </div>
                        <div>
                            {member.quote}
                        </div>
                    </div>
                </li>
                )
            })}
        </ul>
    )
}