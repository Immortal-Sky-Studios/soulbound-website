'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'

import UserDateTime from '@/components/UserDateTime'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    
    return (
        <main className="flex flex-col justify-center items-center h-[90vh] w-[100vw] p-[1rem] bg-[url('/images/backgrounds/CrackedPageBackground.png')] bg-cover">
            <h1 className="mb-0">DECK 0S REPORT: {<UserDateTime/>}</h1>
            <h1>SERVER ERROR</h1>
            <p className="text-[2rem] text-center mb-[1rem]">{error.message}{error.digest ? ` (${error.digest})` : ''}</p>
            <p className="mb-[2rem]">The Diamonds are working on it</p>
            <button onClick={() => reset()} className="border-2 rounded bg-cyan-300 px-[0.5rem]">Try Again</button>
        </main>
    )
}