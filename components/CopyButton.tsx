'use client'

import Image from "next/image";
import { useState } from "react";


export default function CopyButton({
    copyStr,
    icon,
    icon_alt_text,
    icon_width,
    icon_height,
    label_text,
}: {
    copyStr: string,
    icon: string,
    icon_alt_text: string,
    icon_width?: number,
    icon_height?: number,
    label_text?: string,
}) {
    const [label, setLabel] = useState(label_text || "COPY");

    function handleClick() {
        navigator.clipboard.writeText(copyStr);
        setLabel("COPIED!");
        setTimeout(() => {
            setLabel(label_text || "COPY");
        }, 1000);
    }

    return (
        <button className="relative cursor-pointer group" onClick={handleClick}>
            <div className="absolute w-[3rem] h-[3rem] text-center content-center bg-background/50 rounded invisible group-hover:visible z-10">{label}</div>
            <Image
                className="h-[3rem] w-full"
                src={icon}
                alt={icon_alt_text}
                width={icon_width || 64}
                height={icon_height || 64}
                loading="eager"
            />
        </button>
    )
}