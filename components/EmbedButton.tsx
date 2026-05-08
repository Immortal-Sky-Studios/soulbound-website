'use client'

import Image from "next/image";
import { useState } from "react";

import EmbedIcon from '@images/icons/embed-icon.svg';


export default function EmbedButton({
    embedStr,
}: {
    embedStr: string
}) {
    const [label, setLabel] = useState("EMBED");

    function handleClick() {
        navigator.clipboard.writeText(embedStr);
        setLabel("COPIED!");
        setTimeout(() => {
            setLabel("EMBED");
        }, 1000);
    }

    return (
        <li>
            <button className="cursor-pointer" onClick={handleClick}>
                <Image
                    className="h-[3rem] w-fit"
                    src={EmbedIcon}
                    alt="Embed Icon"
                />
                <div id="embed-label" className="-mt-[.5rem]">{label}</div>
            </button>
        </li>
    )
}