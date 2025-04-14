'use client'
import { use } from 'react';
import Image from 'next/image';

export default function EmbeddedEpisode({
    art,
}: {
    art: Promise<Record<string, any>[]>
}) {
    const conceptArt = use(art);

    const plusSlides = () => {
        // magic happens
    }
    const minusSlides = () => {
        // magic happens
    }
    
    return (
        <div id="conceptgallery-container">
            <h2>Concept Art Gallery</h2>
            <div id="concept-gallery">
                {conceptArt.map((entry,index) => (
                    <div key={index}>
                        <div>{index + 1} / {conceptArt.length}</div>
                        <Image
                            className=""
                            src={`/concept-art/${entry.filename}`}
                            alt={entry.alt_text}
                            width={300}
                            height={300}
                            priority
                        />
                        <div>{entry.caption}</div>
                    </div>
                ))}
                
            </div>
            
            <a id="prev-button" onClick={minusSlides}>&#10094;</a>
            <a id="next-button" onClick={plusSlides}>&#10095;</a>
        </div>
    )
}