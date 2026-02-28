import type { ParsedFlow, Dependency } from "../types/flowTypes.js";
import { traverse } from "../utils/traverse.js";
import { targetOrgService } from "./targetOrgService.js";

const userIdRegex = /005[a-zA-Z0-9]{12,15}/;

function detectDependency(key: string, value: unknown): Dependency | null {
    if (typeof value !== "string") return null;

    if (key === "referencedFlow") {
        return {
            type: "subFlow",
            sourceValue: value,
            isResolved: targetOrgService.assetExists(value),
            targetValue: targetOrgService.assetExists(value) ? value : undefined
        };
    }

    if (userIdRegex.test(value)) {
        return {
            type: "userId",
            sourceValue: value,
            isResolved: false
        };
    }

    if (value.includes(".") && value.endsWith("__c")) {
        return {
            type: "customField",
            sourceValue: value,
            isResolved: false
        };
    }

    if (!value.includes(".") && value.endsWith("__c")) {
        return {
            type: "customObject",
            sourceValue: value,
            isResolved: false
        };
    }

    return null;
}

export function parseFlow(flowJson: any): ParsedFlow {
    const dependencies: Dependency[] = [];
    const seen = new Set<string>();

    traverse(flowJson, (key, value) => {
        const dep = detectDependency(key, value);

        if (dep && !seen.has(dep.sourceValue)) {
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