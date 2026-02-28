import { useEffect, useState } from "react"
import { getFlows } from "../services/api"

interface Flow {
    id: string
    name: string
    status: "parsed" | "deployed"
}

export default function FlowList() {

    const [flows, setFlows] = useState<Flow[]>([])

    useEffect(() => {

        async function fetchFlows() {
            const res = await getFlows()
            setFlows(res.data.flows)
        }

        fetchFlows()

    }, [])

    return (

        <div>

            <h3>Imported Flows</h3>

            <ul>

                {flows.map((flow) => (

                    <li key={flow.id}>
                        {flow.name} — {flow.status}
                    </li>

                ))}

            </ul>

        </div>

    )

}