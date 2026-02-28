import { useLocation } from "react-router-dom"
import JsonDiffViewer from "../components/JsonDiffViewer"

interface ResultState {
    sourceFlowJson: unknown
    targetFlowJson: unknown
    summary: {
        totalDependencies: number
        remapped: number
        skipped: number
        unmapped?: string[]
    }
}

export default function ResultPage() {

    const { state } = useLocation() as { state: ResultState }

    return (

        <div className="container">

            <h2>Deployment Result</h2>

            <div className="summary">

                <p>Total Dependencies: {state.summary.totalDependencies}</p>

                <p>Remapped: {state.summary.remapped}</p>

                <p>Skipped: {state.summary.skipped}</p>

            </div>

            <JsonDiffViewer
                source={state.sourceFlowJson}
                target={state.targetFlowJson}
            />

        </div>

    )
}