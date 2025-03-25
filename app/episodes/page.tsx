import { useState } from 'react'
import { getEpisodeList } from "../neonFunctions";

export default async function Episodes() {
    const data = await getEpisodeList()

    const [searchItem, setSearchItem] = useState('')
    const [filteredEps, setFilteredEps] = useState(data)
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = data.filter((entry) => 
            entry.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredEps(filteredItems);
    }

    return (
        <main className="flex flex-row justify-items-center w-screen bg-[/StarryBG.gif]">
            <div id="center-container" className="flex flex-col w-0.5 h-full">
                <div id="main-header" className="flex flex-col">
                    <h1>EPISODES</h1>
                    <div id="showlinks-container" className="flex flex-row">
                        <a href="">Spotify</a>
                        <a href="">Itunes</a>
                        <a href="">Amazon</a>
                        <a href="">Youtube</a>
                    </div>
                    <hr/>
                    <div id="search-container">
                        <input name="episode-search" type="text" placeholder="Search for an episode" value="" autoFocus={true} onChange={handleSearch} />
                    </div>
                </div>
                <ul id="results-list" className="overflow-scroll list-none">
                    {filteredEps.map((entry, index) => {
                        return (
                            <li key={index} className="flex flex-row">
                                <div>Season {entry.season_num}</div>
                                <h2><a href={entry.slug}>Ep {entry.ep_num} {entry.title}</a></h2>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    )
}