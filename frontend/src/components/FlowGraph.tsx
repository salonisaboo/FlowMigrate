import type { Dependency } from "../types/flowTypes"

interface Props {
    flowName: string
    dependencies: Dependency[]
}

export default function FlowGraph({ flowName, dependencies }: Props) {

    const subFlows = dependencies.filter(dep => dep.type === "subFlow")

    if (subFlows.length === 0) {
        return null
    }

    return (

        <div className="graph">

            <h3>Flow Dependency Graph</h3>

            <div className="graphContainer">

                {subFlows.map(sub => (

                    <div key={sub.sourceValue} className="graphConnection">

                        <div className="graphNode">
                            {sub.sourceValue}
                        </div>

                        <div className="arrow">↓</div>

                        <div className="graphNode mainNode">
                            {flowName}
                        </div>

                    </div>

                ))}

            </div>

        </div>

    )
}