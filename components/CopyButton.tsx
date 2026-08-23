'use client'

import Image from "next/image";
import { useState } from "react";
import { text } from "stream/consumers";


export default function CopyButton({
    copyStr,
    icon,
    icon_alt_text,
    icon_width,
    icon_height,
    text_color,
}: {
    copyStr: string,
    icon: string,
    icon_alt_text: string,
    icon_width?: number,
    icon_height?: number,
    text_color?: string,
}) {
    const [visible, setVisible] = useState("visible");

    function handleClick() {
        navigator.clipboard.writeText(copyStr);
        setVisible("invisible");
        setTimeout(() => {
            setVisible("visible");
        }, 1000);
    }

    return (
        <button className={`relative cursor-pointer`} onClick={handleClick}>
            <Image
                className={`absolute h-[3rem] w-full z-10 ${visible}`}
                src={icon}
                alt={icon_alt_text}
                width={icon_width || 64}
                height={icon_height || 64}
                loading="eager"
            />
            <p className={`w-[3rem] h-[3rem] text-center content-center`} style={{color: text_color}}>COPIED!</p>
        </button>
    )
}