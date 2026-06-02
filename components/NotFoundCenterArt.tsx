'use client'
import { use } from 'react';
import Image from "next/image";

import { getNotFoundArt } from "@/lib/neonFunctions";

export default function CenterArt({
    art,
}: {
    art: ReturnType<typeof getNotFoundArt>
}) {
    const centerArt = use(art)[0];

    return (
        <Image
            className="object-contain h-[25rem] mb-[1rem] w-fit"
            src={`/images/404art/${centerArt.filename}`}
            alt={centerArt.alt_text}
            width={centerArt.width}
            height={centerArt.height}
            preload={true}
        />
    )
}