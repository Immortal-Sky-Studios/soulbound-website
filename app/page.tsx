import Image from "next/image";
import { getLatestEp } from "./neonFunctions";

export default function Home() {
    const data = getLatestEp()
    return (
        <main>
            <div id="top-banner" className="flex bg-[/StarryBG.gif]">
                
            </div>
            <div id="whatis-section" className="flex flex-row [border-image:borders/blah]">
                <div id="podcast-description">

                </div>
                <Image
                    id="episode-cover"
                    className=""
                    src="defaultCover.png"
                    alt="Soulbound Podcast cover art"
                    width={300}
                    height={300}
                    priority
                />
            </div>
            <div id="latestep-section">
                <h2>Latest Episode</h2>
                <iframe src={data.slug}/>
            </div>
            <div id="keepingup-section">
                <ul className="flex flex-row list-none">
                    <li><i>InstaIconGoesHere</i></li>
                </ul>
            </div>
        </main>
    )
}