import Image from "next/image";
import Link from "next/link";
import { getLatestEp, getShowLinks } from "./neonFunctions";

export default async function Home() {
    const data = await getLatestEp();
    const showLinks = await getShowLinks();

    return (
        <main className="flex flex-col">
            <div id="top-banner" className="flex bg-[url('/backgrounds/StarryBG.gif')]">
                
            </div>
            <div id="whatis-section" className="flex flex-row align-center justify-around p-[3em] bg-cyan-300 border-[2em] border-image-[url('/borders/MetalScrewBorder.png')] border-slice-[990] border-image-width-[150px] border-repeat-round">
                <div id="podcast-description" className="m-[1em] w-1/3">
                    <h2>What is Soulbound?</h2>
                    Doctor Jaylin Glaslow is a well renowned historian aboard a space station known as the Deck. When he learns of robots who have begun to think and feel without the aid of AI or manmade devices, he is sent out to investigate why these robots have developed sentience through interviewing them on a desolate planet known as Last Stand, a place uninhabitable by organic life, but a great place for inorganic life to hide. Every week he interviews a new robot to learn about their planet and their past, hoping that maybe one day he’ll figure out what makes them work the way they do.
                </div>
                <Image
                    id="episode-cover"
                    className="mx-[5em]"
                    src="/covers/episodes/defaultCover.jpg"
                    alt="Soulbound Podcast cover art"
                    width={384}
                    height={384}
                    priority
                />
            </div>
            <div id="latestep-section" className="flex flex-col align-center py-[2em] px-[10em] bg-[url('/backgrounds/MetalHeartBackground.png')] bg-size-[5em] bg-repeat border-[2em] border-image-[url('/borders/MetalHashBorder.png')] border-slice-t-[980] border-slice-r-[1000] border-slice-b-[990] border-slice-l-[1030] border-image-width-[150px] border-repeat-round">
                <h2>Latest Episode</h2>
                <iframe src={`episodes/${data.slug}`}/>
            </div>
            <div id="keepingup-section" className="flex flex-col justify-center align-center p-[3em] bg-cyan-300 border-[2em] border-image-[url('/borders/MetalScrewBorder.png')] border-slice-[990] border-image-width-[150px] border-repeat-round">
                <h2>Keep up to date with us!</h2>
                <ul className="flex flex-row w-2/3 px-[2em] justify-between align-center list-none">
                    {showLinks.map((entry,index) => {
                        return (
                            <li key={index}>
                                <Link
                                    href={entry.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src={`icons/${entry.icon_filename}`}
                                        alt={entry.icon_alt_text}
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    )
}