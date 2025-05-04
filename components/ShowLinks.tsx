'use client'
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ShowLinks({
    links,
}: {
    links: Promise<Record<string, any>[]>
}) {
    const showLinks = use(links);
    return (
        <ul className="flex flex-row justify-between align-center flex-wrap w-2/3 px-[2em] list-none">
            {showLinks.map((entry) => {
                return (
                    <li key={entry.id} >
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