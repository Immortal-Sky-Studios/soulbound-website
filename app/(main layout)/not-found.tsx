import { getNotFoundArt } from "@/lib/neonFunctions";
import UserDateTime from "@/components/UserDateTime";
import CenterArt from "@/components/NotFoundCenterArt";


export default function MainNotFound() {
    const centerArt = getNotFoundArt();

    return (
        <main className="flex flex-col justify-center items-center h-[90vh] w-[100vw] overflow-x-hidden bg-[url('/images/backgrounds/CrackedPageBackground.webp')] bg-cover">
            <h1 className="mb-0">DECK 0S REPORT: {<UserDateTime/>}</h1>
            <h1>ERROR 404</h1>
            <CenterArt art={centerArt}/>
            <h2>Page not found</h2>
            <p className="mb-[2rem]">The Diamonds are working on it</p>
        </main>
    )
}