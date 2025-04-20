'use client'
import { use } from 'react';
import Image from 'next/image';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function EmbeddedEpisode({
    art,
}: {
    art: Promise<Record<string, any>[]>
}) {
    const conceptArt = use(art);
    
    return (
        <div id="conceptgallery-container">
            <h2>Concept Art Gallery</h2>
            <Carousel>
                {conceptArt.map((entry,index) => (
                    <div key={entry.id}>
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
                
            </Carousel>
        </div>
    )
}