import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Stalinist_One } from "next/font/google";

const stalinistOne = Stalinist_One({
    weight: "400",
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Terms of Use',
    alternates: {
        canonical: './terms-of-use',
    },
};

export default function TermsOfUse() {
    return (
        <main className="flex flex-row justify-center w-full bg-[url('/images/backgrounds/SpaceBannerSTATIC.png')]">
            <div id="center-container" className="flex flex-col items-center w-full md:w-2/3 h-full p-[3rem] bg-background border-x-[1rem] border-image-[url('/images/borders/RivetSideBorderX.png')] border-slice-[40] border-image-width-l-[1rem] border-image-width-r-[1rem] border-repeat-round">
                <h1 className={`${stalinistOne.className} w-fit px-[1rem] text-center mb-[3rem] border-[1rem] border-image-[url('/images/borders/RivetCornerBorder.png')] border-slice-[43] border-image-width-[1rem] border-repeat-round`}>Terms of Use</h1>
                <div className="flex flex-col">
                    <p>
                        Soulbound is an independently produced volunteer project, which means any work done on this website has been done on our own time and on our own dollar. As such, it's only as accurate as we have the time to make it. We may fall behind on episode releases and transcripts, and our transcripts may not be as accurate as we'd like. We do our best to maintain all of our information to be as up to date as possible, but if you hear us contradict ourselves in the podcast itself, trust the podcast first.
                        <br/><br/>
                        Our podcast takes place in a speculative, fictional future after Earth's demise. As such, we feel it's obvious that this is fiction, as Earth is not dead, and if it was there wouldn't be a podcast. However. Some of you will still sue us if things come true, so for the sake of our wallets:
                    </p>
                    <ul className="list-disc pl-[2rem]">
                        <li>Soulbound is a work of fiction. Although it's form is that of a series of interviews and recorded social-political events, no real interviews or social-political events have been used in the production of this podcast.</li>
                        <li>Time and Space are relative and have been modified to suit the narrative of the show, and with the exception of public figures, any resemblance to any persons living or dead are purely coincidental.</li>
                        <li>The opinions expressed by these characters should not be mistaken as the Authors personal beliefs. In fact the Author is rather appalled by some of these characters, and is haunted by them anyway.</li>
                        <li>The author does not condone the creation of what is colloquially called a “Torment Nexus.” If you build a HEART or SOUL drive, do not blame the author when it goes wrong.</li>
                    </ul>

                    <h2 id="cookie-policy" className="mt-[2rem]">Cookie Policy</h2>
                    <p>
                        This website has absolutely no reason to collect cookies, or frankly any kind of information from its users, and as such, by design, does not.
                        <br/><br/>
                        That being said, a few of the other platforms required to make this site work <em>do</em> collect cookies of their own, namely:
                    </p>
                    <ul className="list-disc pl-[2rem]">
                        <li>Cloudflare, our website host, collects some cookies during any use of the site. Here's their <Link className="underline hover:no-underline" href="https://www.cloudflare.com/cookie-policy/" target="_blank" rel="noopener noreferrer">Cookie Policy</Link> and <Link className="underline hover:no-underline" href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.</li>
                        <li>Spotify, our primary podcast host, collects some cookies via the Embedded Players on our Episode pages. Here's their <Link className="underline hover:no-underline" href="https://www.spotify.com/us/legal/cookies-policy/" target="_blank" rel="noopener noreferrer">Cookie Policy</Link> and <Link className="underline hover:no-underline" href="https://www.spotify.com/us/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.</li>
                    </ul>
                    <p>
                        Even in the case of those exceptions, we still use every setting and tool at our disposal to minimize the amount of cookies collected by these third parties that allow our site to function.
                    </p>

                    <h2 id="ai-statement" className="mt-[2rem]">AI Statement</h2>
                    <p>
                        Soulbound may be about Synthetic People attempting to gain legal recognition, but that doesn't mean we are Pro-Ai. Until the moment that Ai proves itself to be self reliant and fully sentient in its own right, we will never knowingly use Generative Ai in anything we produce. There may be times we slip up, but we will remain transparent about our usage. 
                        <br/><br/>
                        You may have noticed we tagged some of our earliest posts with #ai. We did this because our podcast is about true science fiction Artificial Intelligence. With the rise of modern Generative Ai, and the new definition of Large Language Models and Image Generation, we have stopped tagging our posts with #ai. We have never and will never willingly use Generative Ai in anything relating to the podcast, including this website. All our assets and art are human made.
                        <br/><br/>
                        We do <b>NOT</b> give consent, permission, or license to take our voices, transcripts, website text, artwork, or any other content of any kind produced for this website, this podcast, our social media pages, or any other facet of Soulbound, for use training any LLM, Image Generation model, or other forms of AI model.
                    </p>
                    
                    <h2 id="license" className="mt-[2rem]">License</h2>
                    <p>
                        Soulbound is published under a
                        <Link className="underline hover:no-underline ml-[.25em]" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</Link>
                        <Image
                            className="inline max-w-[1em] max-h-[1em] ml-[.2em]"
                            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                            alt=""
                            width={64}
                            height={64}
                            loading='eager'
                        />
                        <Image
                            className="inline max-w-[1em] max-h-[1em] ml-[.2em]"
                            src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
                            alt=""
                            width={64}
                            height={64}
                            loading='eager'
                        />
                        <Image
                            className="inline max-w-[1em] max-h-[1em] ml-[.2em]"
                            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg"
                            alt=""
                            width={64}
                            height={64}
                            loading='eager'
                        />
                        <Image
                            className="inline max-w-[1em] max-h-[1em] ml-[.2em] mr-[.25em]"
                            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
                            alt=""
                            width={64}
                            height={64}
                            loading='eager'
                        />
                        License. This means you are free to use clips, make fan-creations, and generally share the podcast around so long as you ensure you credit us and aren't profiting off our work. You are free to profit off your own work so long as we are credited as the inspiration or original source. This does not mean you may take any of said content and train an AI model off of them, as mentioned above.
                    </p>
                </div>
            </div>
        </main>
    )
}