'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
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
        <main className="flex flex-row justify-around items-center h-[100vh] w-[100vw] p-[1rem] bg-[#4D4D4D] rounded-4xl">
            <h1 className="h-fit text-center">Server Error</h1>
            <div className="h-fit text-center">{error.message} ({error.digest})</div>
            <button onClick={() => reset()}>Retry</button>
        </main>
    )
}