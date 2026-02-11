export default function Transcript({
    transcript
}: {
    transcript: {
        line_num: number,
        character: string,
        line: string,
    }[]
}) {
    

    return (
        <ul className="list-none">
            {transcript.length == 0 ? <p>Transcript coming soon!</p> : transcript.map((entry) => (
                <li key={entry.line_num} className="my-[0.5rem] px-[0.25rem]">
                    {(entry.character == "Stage Direction") ? <em>[{entry.line}]</em> : <><b>{entry.character}:</b> {entry.line}</>}
                </li>
            ))}
        </ul>
    )
}