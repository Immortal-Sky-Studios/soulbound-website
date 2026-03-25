'use client'
import { use } from 'react';
import Image from 'next/image';
import { getTeamList } from '@/lib/neonFunctions';
import Link from 'next/link';

function parseMarkdown(raw_text: string) {
    return (
        <>
            {!raw_text.includes('-') ?
                <p className="ml-[1rem]">{raw_text}</p>
                : <ul className="ml-[2rem] list-disc">
                    {raw_text.split('-').map((item, index) => {
                        if (item == '') return;
                        
                        const linkComponents = item.split(/[\x5B\x5D\x28\x29]+/);
                        return (
                        <li key={index}>
                            <Link className="underline" href={linkComponents[2] || ''} target="_blank" rel="noopener noreferrer">
                                {linkComponents[1]}
                            </Link>
                        </li>
                    )})}
                </ul>
            }
        </>
    )
}

export default function TeamList({
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
                <li key={entry.id} className={`flex flex-col ${direction ? "lg:flex-row" : "lg:flex-row-reverse"} max-lg:items-center lg:p-[1rem] my-[1rem] bg-[#949494] border-[1rem] border-image-[url('/images/borders/MetalHashBorder.png')] border-slice-t-[980] border-slice-r-[1000] border-slice-b-[990] border-slice-l-[1030] border-image-width-[4rem] border-repeat-round`}>
                    <Image
                        className="object-contain p-0 w-[20rem] h-auto lg:h-[25rem] lg:w-auto bg-[url('/images/backgrounds/MetalHeartBackground.png')] bg-size-[4rem] bg-repeat border-[1rem] border-image-[url('/images/borders/ThreeRivetBorder.png')] border-slice-[180] border-image-width-[1rem] border-repeat-round"
                        src={`/images/headshots/${entry.headshot_filename}`}
                        alt={`Image of ${entry.name}`}
                        width={entry.headshot_width || 2048}
                        height={entry.headshot_width || 2048}
                        priority
                    />
                    <div className="flex flex-col justify-start w-full">
                        <div className={`flex flex-col ${direction ? "items-start" : "items-end"}`}>
                            <h2 className={`px-[0.5rem] mb-0 w-full lg:w-3/4 xl:w-5/8 2xl:w-1/2 ${direction ? "text-start" : "text-end"} bg-cyan-300`}>{entry.name} ({entry.pronouns})</h2>
                            <div className={`h-fit p-[0.25rem] w-3/4 lg:w-5/12 ${direction ? "text-start" : "text-end"} text-[#949494] bg-[#414042]`}>{entry.jobs.length == 0 ? "Upcoming Team Member" : entry.jobs.join(", ")}</div>
                            {entry.roles.length != 0 && <div className={`h-fit p-[0.25rem] mb-[1rem] w-2/3 lg:w-1/3 ${direction ? "text-start" : "text-end"} text-[#949494] bg-[#525053]`}><b>Roles:</b> {entry.roles.join(", ")}</div>}
                        </div>
                        <div className={`flex flex-col justify-start ${direction ? "items-start" : "items-end"} mx-[1rem] pb-[1rem] grow`}>
                            <div className={`w-full max-lg:p-[1rem] mx-[1rem] my-[1rem] ${direction ? "text-start" : "text-end"}`}>
                                {entry.bio}
                            </div>
                            <div className="flex flex-col lg:flex-row w-full justify-around lg:items-center grow">
                                <div id="socials-container">
                                    <h3><b>Socials</b></h3>
                                    {parseMarkdown(entry.socials)}
                                </div>
                                <div id="projects-container">
                                    <h3><b>Projects</b></h3>
                                    {parseMarkdown(entry.projects)}
                                </div>
                                <div id="quote-container">
                                    <h3><b>Favorite Quote</b></h3>
                                    <p className="ml-[1rem]">
                                        {entry.quote.includes('"') ?
                                            <em>{entry.quote}</em> :
                                            <>{entry.quote}</>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                )
            })}
        </ul>
    )
}