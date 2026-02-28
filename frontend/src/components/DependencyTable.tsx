import type { Dependency } from "../types/flowTypes"
import type { Dispatch, SetStateAction } from "react"

interface Props {
    dependencies: Dependency[]
    mappings: Record<string, string>
    setMappings: Dispatch<SetStateAction<Record<string, string>>>
}

export default function DependencyTable({
    dependencies,
    mappings,
    setMappings
}: Props) {

    return (

        <table>

            <thead>
                <tr>
                    <th>Type</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Target Mapping</th>
                </tr>
            </thead>

            <tbody>

                {dependencies.map((dep) => (

                    <tr key={dep.sourceValue}>

                        <td>{dep.type}</td>

                        <td>{dep.sourceValue}</td>

                        {/* STATUS */}

                        <td>
                            {dep.isResolved ? (
                                <span className="badge badge-green">
                                    Resolved
                                </span>
                            ) : (
                                <span className="badge badge-yellow">
                                    Needs Mapping
                                </span>
                            )}
                        </td>

                        {/* TARGET */}

                        <td>

                            {dep.isResolved ? (

                                <span className="autoValue">
                                    {dep.targetValue ?? "Auto"}
                                </span>

                            ) : (

                                <input
                                    placeholder="Enter target value"
                                    value={mappings[dep.sourceValue] || ""}
                                    onChange={(e) =>
                                        setMappings((prev) => ({
                                            ...prev,
                                            [dep.sourceValue]: e.target.value
                                        }))
                                    }
                                />

                            )}

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    )
}