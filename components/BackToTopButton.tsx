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
            <a id="back-to-top" href="#top" className={`sticky top-[88vh] lg:top-[90vh] left-full z-100 ${scrollY == 0 ? 'invisible' : ''}`}>
                <Image
                    className="object-contain w-[6.6rem] h-[6.6rem] sm:w-[5.4rem] sm:h-[5.4rem] mr-[1rem]"
                    src={UpArrow}
                    alt="Upwards facing styled arrow"
                />
            </a>
        </>
    )
}