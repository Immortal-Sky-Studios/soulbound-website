import Link from "next/link";
import Image from "next/image";

import SpotifyIcon from '@images/icons/spotify-icon.svg';
import AppleIcon from '@images/icons/apple-icon.svg';
import AmazonIcon from '@images/icons/amazon-icon.svg';


export default function EpisodeLinks({
    links
}: {
    links: string[]
}) {
    const showLinks = [
        {
            link: links[0],
            icon: SpotifyIcon,
            name: "Spotify"
        },
        {
            link: links[1],
            icon: AppleIcon,
            name: "Apple Podcasts"
        },
        {
            link: links[2],
            icon: AmazonIcon,
            name: "Amazon Music"
        }
    ]

    return (
        <>
            {showLinks.map((entry, index) => (
                <li key={index}>
                    <Link href={entry.link} target="_blank" rel="noopener noreferrer">
                        <Image
                            className="h-[4rem] w-fit"
                            src={entry.icon}
                            alt={`Link to this episode on ${entry.name}`}
                            loading="eager"
                        />
                    </Link>
                </li>
            ))}
        </>
    )
}