'use client'
import { use } from 'react';
import Image from "next/image";

import { getNotFoundArt } from "@/lib/neonFunctions";

export default function ConceptArt({
    art,
}: {
    art: ReturnType<typeof getNotFoundArt>
}) {
    const centerArt = use(art)[0];

    return (
        <Image
            className="object-contain h-[25rem] w-fit border-2 border-black"
            src={`/images/404art/${centerArt.filename}`}
            alt={centerArt.alt_text}
            width={centerArt.width}
            height={centerArt.height}
            priority
        />
    )
}