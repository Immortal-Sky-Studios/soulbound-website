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
        {scrollY != 0 &&
            <a id="back-to-top" href="#top" className="w-[7rem] h-[7rem] fixed bottom-5 right-10 z-100">
                <Image
                    className=""
                    src={UpArrow}
                    alt="Upwards facing styled arrow"
                />
            </a>
        }
        </>
    )
}