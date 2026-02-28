import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

import DependencyTable from "../components/DependencyTable"
import FlowGraph from "../components/FlowGraph"
import { deployFlow } from "../services/api"

export default function DependenciesPage() {

    const { state } = useLocation()
    const navigate = useNavigate()

    const [mappings, setMappings] = useState<Record<string, string>>({})

    const handleDeploy = async () => {

        const res = await deployFlow(state.flowId, mappings)

        navigate("/result", {
            state: res.data
        })

    }

    return (

        <div className="container">

            <h2>Dependencies</h2>

            {state.warnings && state.warnings.length > 0 && (
                <div className="warningBox">
                    <h4>Warnings</h4>
                    <ul>
                        {state.warnings.map((w: string, i: number) => (
                            <li key={i}>{w}</li>
                        ))}
                    </ul>
                </div>
            )}

            <FlowGraph
                flowName={state.flowName}
                dependencies={state.dependencies}
            />

            <DependencyTable
                dependencies={state.dependencies}
                mappings={mappings}
                setMappings={setMappings}
            />

            <button onClick={handleDeploy}>
                Deploy Flow
            </button>

        </div>

    )
}