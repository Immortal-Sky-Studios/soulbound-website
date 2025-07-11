'use client'
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Selectable } from 'kysely';
import type { ShowLinks } from '@/kysely-types';

export default function ShowLinks({
    links,
}: {
    links: Promise<Selectable<ShowLinks>[]>
}) {
    const showLinks = use(links);
    return (
        <ul className="flex flex-row flex-wrap justify-start align-center px-[2em] list-none">
            {showLinks.map((entry) => {
                return (
                    <li key={entry.id} className="mx-[1em]">
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