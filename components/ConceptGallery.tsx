'use client'
import { use } from 'react';
import Image from 'next/image';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { getConceptArt } from '@/lib/neonFunctions';

export default function ConceptArt({
    art,
}: {
    art: ReturnType<typeof getConceptArt>
}) {
    const conceptArt = use(art);

    return (
        <Carousel className="w-full md:w-1/2" autoPlay infiniteLoop showThumbs={false}>
            {conceptArt.map((entry) => (
                <div key={entry.id} className="relative h-[75vh]">
                    <Image
                        className="object-contain pt-[2rem] pb-[4rem]"
                        src={`/images/conceptArt/${entry.filename}`}
                        alt={entry.alt_text}
                        fill
                        sizes="75vh"
                        priority
                    />
                    <div className="absolute bottom-[2rem] text-center w-full">{entry.alt_text}</div>
                </div>
            ))}
        </Carousel>
    )
}