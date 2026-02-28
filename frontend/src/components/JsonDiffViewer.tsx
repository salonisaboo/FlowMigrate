interface Props {
    source: unknown
    target: unknown
}

export default function JsonDiffViewer({ source, target }: Props) {

    if (!source || !target) {
        return <p>No JSON available</p>
    }

    const sourceJson = JSON.stringify(source, null, 2)
    const targetJson = JSON.stringify(target, null, 2)

    return (

        <div className="diffViewer">

            <h3>JSON Diff</h3>

            <div className="diffContainer">

                <div className="diffBox">

                    <h4>Source JSON</h4>

                    <pre>{sourceJson}</pre>

                </div>

                <div className="diffBox">

                    <h4>Target JSON</h4>

                    <pre>{targetJson}</pre>

                </div>

            </div>

        </div>

    )
}