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
            <button className="cursor-pointer" onClick={() => {
                navigator.clipboard.writeText(embedStr);
                let label = document.getElementById("embed-label");
                if (label) {
                    label.textContent = "COPIED!";
                    setTimeout(() => {
                        label.textContent = "EMBED";
                    }, 1000);
                }
            }}>
                <Image
                    className="h-[3rem] w-fit"
                    src={EmbedIcon}
                    alt="Embed Icon"
                />
                <div id="embed-label" className="-mt-[.5rem]">EMBED</div>
            </button>
        </li>
    )
}