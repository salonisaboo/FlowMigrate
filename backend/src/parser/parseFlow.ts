import type { ParsedFlow, Dependency } from "../types/flowTypes.js";
import { traverse } from "../utils/traverse.js";
import { extractDependency } from "./dependencyExtractor.js";
import { targetOrgService } from "../services/targetOrgService.js";
export function parseFlow(flowJson: any): ParsedFlow {
    const dependencies: Dependency[] = [];
    const seen = new Set<string>();

    traverse(flowJson, (key, value) => {
        const dep = extractDependency(key, value);

        if (dep && !seen.has(dep.sourceValue)) {

            if (dep.type === "subFlow" && targetOrgService.assetExists(dep.sourceValue)) {
                dep.isResolved = true;
                dep.targetValue = dep.sourceValue;
            }

            dependencies.push(dep);
            seen.add(dep.sourceValue);
        }
    });

    return {
        id: flowJson.id,
        name: flowJson.name,
        label: flowJson.label,
        triggerObjectType: flowJson.triggerObjectType,
        dependencies
    };
}