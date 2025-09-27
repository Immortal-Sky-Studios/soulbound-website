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
        <div className="relative h-[50vh] w-2/3 m-[1rem]">
            <Image
                className="object-contain"
                src={`/images/404art/${centerArt.filename}`}
                alt={centerArt.alt_text}
                fill
                sizes="50vh"
                priority
            />
        </div>
    )
}