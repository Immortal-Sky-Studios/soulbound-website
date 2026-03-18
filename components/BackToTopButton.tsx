'use client'
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

import UpArrow from "@images/misc/ArrowGearUp.png";

export default function BackToTopButton() {
    const [scrollY, setScrollY] = useState(0);

    const onScroll = useCallback(() => {
        setScrollY(window.pageYOffset);
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
        window.removeEventListener("scroll", onScroll);
        }
    }, [onScroll]);


    return (
        <>
            <a id="back-to-top" href="#top" className={`sticky h-fit bottom-5 right-5 z-100 pointer-events-auto ${scrollY == 0 ? 'hidden' : ''}`}>
                <Image
                    className="object-contain w-[7rem] h-[7rem] sm:w-[5rem] sm:h-[5rem]"
                    src={UpArrow}
                    alt="Upwards facing styled arrow"
                />
            </a>
        </>
    )
}