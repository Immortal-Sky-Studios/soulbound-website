'use client'
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getShowLinks } from '@/lib/neonFunctions';
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from 'react-loading-skeleton';
import CopyButton from './CopyButton';

export default function ShowLinks({
    links,
}: {
    links: ReturnType<typeof getShowLinks>
}) {
    const showLinks = use(links);
    
    return (
        <ul className="flex flex-row flex-wrap justify-center items-center sm:px-[2rem] list-none">
            {!showLinks?.length ? <Skeleton count={10}/> : showLinks.map((entry) => {
                return (
                    entry.copy_only ?
                        <li key={entry.id} className="m-[1rem]">
                            <CopyButton
                                copyStr={entry.link}
                                icon={`/images/icons/${entry.icon_filename}`}
                                icon_alt_text={entry.icon_alt_text}
                            />
                        </li>
                    :
                        <li key={entry.id} className="m-[1rem]">
                            <Link
                                href={entry.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    className="h-[3rem] w-fit"
                                    src={`/images/icons/${entry.icon_filename}`}
                                    alt={entry.icon_alt_text}
                                    width={64}
                                    height={64}
                                    loading="lazy"
                                />
                            </Link>
                        </li>
                )
            })}
        </ul>
    )
}