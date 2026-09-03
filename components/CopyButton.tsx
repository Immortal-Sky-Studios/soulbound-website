'use client'

import Image from "next/image";
import { useState } from "react";


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
    const [visible, setVisible] = useState(true);

    function handleClick() {
        navigator.clipboard.writeText(copyStr);
        setVisible(false);
        setTimeout(() => {
            setVisible(true);
        }, 1000);
    }

    return (
        <button className="flex justify-center items-center cursor-pointer h-[3rem] w-[3rem]" onClick={handleClick}>
            { visible ?
                <Image
                    className="object-contain"
                    src={icon}
                    alt={icon_alt_text}
                    width={icon_width || 64}
                    height={icon_height || 64}
                    loading="eager"
                />
            :
                <p className="text-center content-center" style={{color: text_color}}>COPIED!</p>
            }
        </button>
    )
}