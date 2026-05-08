'use client'

export default function UserDateTime() {
    return (
        <>{new Date().toLocaleDateString()}</>
    )
}