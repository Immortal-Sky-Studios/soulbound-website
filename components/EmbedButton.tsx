'use client'

import Image from "next/image";

import EmbedIcon from '@images/icons/embed-icon.svg';


export default function EmbedButton({
    embedStr,
}: {
    embedStr: string
}) {
    return (
        <li>
            <button className="cursor-pointer" onClick={() => {navigator.clipboard.writeText(embedStr)}}>
                <Image
                    className="h-[3rem] w-fit"
                    src={EmbedIcon}
                    alt="Embed Icon"
                />
            </button>
        </li>
    )
}