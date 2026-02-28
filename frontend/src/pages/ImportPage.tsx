import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { parseFlow } from "../services/api"
import FlowList from "../components/FlowList"

export default function ImportPage() {

    const [json, setJson] = useState("")
    const [warnings, setWarnings] = useState<string[]>([])

    const navigate = useNavigate()

    const handleParse = async () => {

        if (!json.trim()) {
            setWarnings(["No JSON provided. Please upload or paste a flow file."])
            return
        }

        try {

            const flowJson = JSON.parse(json)

            const res = await parseFlow(flowJson)

            setWarnings(res.data.warnings || [])

            navigate("/dependencies", {
                state: res.data
            })

        } catch {

            setWarnings(["Invalid JSON format. Please check the file."])

        }

    }

    return (
        <div className="container">

            <h1>FlowMigrate</h1>

            <input
                type="file"
                accept=".json"
                onChange={(e) => {

                    const file = e.target.files?.[0]

                    if (!file) return

                    const reader = new FileReader()

                    reader.onload = (event) => {
                        setJson(event.target?.result as string)
                    }

                    reader.readAsText(file)
                }}
            />

            <textarea
                rows={16}
                placeholder="Paste Flow JSON here"
                value={json}
                onChange={(e) => setJson(e.target.value)}
            />

            <button onClick={handleParse}>
                Parse Flow
            </button>

            {/* WARNINGS */}

            {warnings.length > 0 && (
                <div className="warningBox">

                    <h3>Warnings</h3>

                    <ul>
                        {warnings.map((w, i) => (
                            <li key={i}>{w}</li>
                        ))}
                    </ul>

                </div>
            )}

            <FlowList />

        </div>
    )
}