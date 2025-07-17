'use client'
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getShowLinks } from '@/lib/neonFunctions';
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from 'react-loading-skeleton';

export default function ShowLinks({
    links,
}: {
    links: ReturnType<typeof getShowLinks>
}) {
    const showLinks = use(links);
    return (
        <ul className="flex flex-row flex-wrap justify-start align-center sm:px-[2rem] list-none">
            {!showLinks?.length ? <Skeleton count={10}/> : showLinks.map((entry) => {
                return (
                    <li key={entry.id} className="mx-[1rem]">
                        <Link
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={`/images/icons/${entry.icon_filename}`}
                                alt={entry.icon_alt_text}
                                width={50}
                                height={50}
                            />
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}