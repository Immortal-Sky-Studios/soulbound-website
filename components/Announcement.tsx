'use client'
import { use, useState } from 'react';
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
    if (episode?.id > announcement?.id) return (<></>);

    const [open, setOpen] = useState(false);

    function animateOpenClose() {
        setOpen(!open);
    }
    
    return (
        <div id="announcement-container" className={`group ${open ? 'open' : 'closed'} py-[1rem] px-[2rem] whitespace-pre-line bg-[#949494] border-[1rem] border-image-[url('/images/borders/MetalHashBorder.png')] border-slice-t-[980] border-slice-r-[1000] border-slice-b-[990] border-slice-l-[1030] border-image-width-[4rem] border-repeat-round`}>
            <div className="flex flex-row justify-start items-center">
                <h2>Announcement!</h2>
                <button onClick={animateOpenClose} className="mb-[0.5rem] ml-[2rem] cursor-pointer">{open ? "Hide ⮝" : "Show ⮟"}</button>
            </div>
            <p className={`transition-[max-height] duration-[1s] ease-in-out not-group-[.open]:max-h-0 group-[.open]:max-h-[150vh] overflow-y-hidden `}>{announcement?.description?.replace(/\\n/g,"\n")}</p>
        </div>
    )
}