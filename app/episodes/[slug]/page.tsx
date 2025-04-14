import Image from "next/image";
import { getEpisode } from '@lib/neonFunctions.ts';

export default async function EpisodeDynamic({
        params,
    }: {
        params: Promise<{ slug: string }>
    }) {
        const { slug } = await params
        const data = await getEpisode(slug)
        return (
            <main>
                <div id="top-section">
                    <div id="left-section">
                        <Image
                            id="episode-cover"
                            className=""
                            src={`/covers/episodes/${data.cover_filename}`}
                            alt={data.cover_alt_txt}
                            width={300}
                            height={300}
                            priority
                        />
                        <div id="spotify-player"></div>
                        <div id="showlinks-container">
                            <a href={data.link_spotify} target="_blank" rel="noopener noreferrer"><i>SPOTIFYICONHERE</i></a>
                            <a href={data.link_apple} target="_blank" rel="noopener noreferrer"><i>APPLEICONHERE</i></a>
                            <a href={data.link_amazon} target="_blank" rel="noopener noreferrer"><i>AMAZONICONHERE</i></a>
                        </div>
                    </div>
                    <div id="right-section">
                        <div id="episode-info-container">
                            <h2>Season {data.season_num}</h2>
                            <div id="episode-info">
                                <h2>Soulbound Ep.{data.ep_num} - {data.title}</h2>
                                <p id="episode-description">{data.description}</p>
                            </div>
                        </div>
                        <div id="transcript-container">
                            However the fuck we render the transcript
                        </div>
                    </div>
                </div>
                <div id="credits-container">
                    {data.credits.filter((entry) => entry.superrole === 'cast').map((entry,index) => {
                        return (
                            <div key={index}>
                                <b>{entry.role}:</b> {entry.name}
                            </div>
                        )
                    })}
                    {data.credits.filter((entry) => entry.superrole === 'crew').map((entry,index) => {
                        return (
                            <div key={index}>
                                <b>{entry.role}:</b> {entry.name}
                            </div>
                        )
                    })}
                </div>
            </main>
        )
}