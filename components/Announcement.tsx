'use client'
import { use } from 'react';
import { getLatestEp } from '@/lib/neonFunctions';

export default function Announcement({
    latestEp,
    latestAnnounce,
}: {
    latestEp: ReturnType<typeof getLatestEp>,
    latestAnnounce: ReturnType<typeof getLatestEp>
}) {
    const episode = use(latestEp);
    const announcement = use(latestAnnounce);
    if (episode?.id < announcement?.id) {
        console.log(announcement.description)
        return (
            <div id="announcement-container" className="py-[1rem] px-[2rem] whitespace-pre-line bg-[#949494] border-[1rem] border-image-[url('/images/borders/MetalHashBorder.png')] border-slice-t-[980] border-slice-r-[1000] border-slice-b-[990] border-slice-l-[1030] border-image-width-[4rem] border-repeat-round">
                <h2>Announcement!</h2>
                <p>{announcement?.description?.replace(/\\n/g,"\n")}</p>
            </div>
        )
    }

    return (<></>)
}