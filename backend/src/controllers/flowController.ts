import type { Request, Response } from "express"

import { parseFlow } from "../services/parserService.js"
import { flowStore } from "../store/flowStore.js"
import { remapFlow } from "../services/remapService.js"

export function parseFlowController(req: Request, res: Response) {

    const { flowJson } = req.body

    if (!flowJson) {
        return res.status(400).json({ error: "flowJson is required" })
    }

    const parsed = parseFlow(flowJson)

    const warnings: string[] = []

    // check dependencies BEFORE storing the flow
    parsed.dependencies
        .filter(d => d.type === "subFlow")
        .forEach(dep => {

            const exists = flowStore
                .getAllFlows()
                .some(f => f.name === dep.sourceValue)

            if (!exists) {
                warnings.push(
                    `Flow '${parsed.name}' depends on '${dep.sourceValue}' which isn't imported yet. Deployment may fail.`
                )
            }

        })

    flowStore.addFlow(parsed.id, {
        parsedFlow: parsed,
        originalJson: flowJson,
        status: "parsed"
    })

    res.json({
        flowId: parsed.id,
        flowName: parsed.name,
        dependencies: parsed.dependencies,
        warnings,
        sourceFlowJson: flowJson
    })
}

export function deployFlowController(req: Request, res: Response) {

    const { flowId, mappings } = req.body

    if (!flowId) {
        return res.status(400).json({ error: "flowId is required" })
    }

    const flow = flowStore.getFlow(flowId)

    if (!flow) {
        return res.status(404).json({ error: "Flow not found" })
    }

    const remapped = remapFlow(flow.originalJson, mappings || {})

    const deps = flow.parsedFlow.dependencies

    let remappedCount = 0
    let skipped = 0

    const unmapped: string[] = []

    deps.forEach(dep => {

        if (dep.isResolved) {
            skipped++
            return
        }

        if (mappings && mappings[dep.sourceValue]) {
            remappedCount++
        } else {
            unmapped.push(dep.sourceValue)
        }

    })

    flowStore.updateStatus(flowId, "deployed")

    res.json({
        success: true,

        sourceFlowJson: flow.originalJson,

        targetFlowJson: remapped,

        summary: {
            totalDependencies: deps.length,
            remapped: remappedCount,
            skipped,
            unmapped
        }
    })
}

export function getFlowsController(req: Request, res: Response) {

    res.json({
        flows: flowStore.getAllFlows()
    })
}