'use client'
import { use } from 'react';
import Image from 'next/image';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import LeftArrow from '@images/misc/ArrowGearLeft.png'
import RightArrow from '@images/misc/ArrowGearRight.png'

import { getConceptArt } from '@/lib/neonFunctions';

export default function ConceptArt({
    art,
}: {
    art: ReturnType<typeof getConceptArt>
}) {
    const conceptArt = use(art);

    return (
        <Carousel className="w-full m:w-3/4 xl:w-1/2" autoPlay infiniteLoop showThumbs={false}
            renderArrowPrev={(clickHandler, hasPrev) => {
                return (
                    <div
                        className={`${
                        hasPrev ? "absolute" : "hidden"
                        } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                        onClick={clickHandler}
                    >
                        <Image
                            className="object-contain h-1/4 w-auto select-none"
                            src={LeftArrow}
                            alt="Gallery carousel left arrow"
                            loading="lazy"
                        />
                    </div>
                )
            }}
            renderArrowNext={(clickHandler, hasNext) => {
                return (
                    <div
                        className={`${
                        hasNext ? "absolute" : "hidden"
                        } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                        onClick={clickHandler}
                    >
                        <Image
                            className="object-contain h-1/4 w-auto select-none"
                            src={RightArrow}
                            alt="Gallery carousel right arrow"
                            loading="lazy"
                        />
                    </div>
                )
            }}
        >
            {conceptArt.map((entry) => (
                <div key={entry.id} className="relative h-[55vh] m:h-[33vh] md:h-[50vh] lg:h-[75vh] mx-[8rem]">
                    <Image
                        className="object-contain pt-[2rem] pb-[4rem]"
                        src={`/images/conceptArt/${entry.filename}`}
                        alt={entry.alt_text}
                        fill
                        sizes="75vh"
                        loading="lazy"
                    />
                    <div className="absolute bottom-[2rem] text-center w-full">{entry.alt_text}</div>
                </div>
            ))}
        </Carousel>
    )
}