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
        <main className="flex flex-col justify-center items-center h-[90vh] w-[100vw] bg-[url('/images/backgrounds/CrackedPageBackground.png')] bg-cover">
            <h1 className="mb-0">DECK 0S REPORT: {<UserDateTime/>}</h1>
            <h1>SERVER ERROR</h1>
            <h2>{error.message} ({error.digest})</h2>
            <p className="mb-[2rem]">The Diamonds are working on it</p>
            <button onClick={() => reset()}>Try Again</button>
        </main>
    )
}