import type { Dependency } from "../types/flowTypes.js";
import { isCustomField, isCustomObject, isUserId } from "./rules.js";

export function extractDependency(key: string, value: unknown): Dependency | null {
    if (typeof value !== "string") return null;

    if (key === "referencedFlow") {
        return {
            type: "subFlow",
            sourceValue: value,
            isResolved: false
        };
    }

    if (isUserId(value)) {
        return {
            type: "userId",
            sourceValue: value,
            isResolved: false
        };
    }

    if (isCustomField(value)) {
        return {
            type: "customField",
            sourceValue: value,
            isResolved: false
        };
    }

    if (isCustomObject(value)) {
        return {
            type: "customObject",
            sourceValue: value,
            isResolved: false
        };
    }

    return null;
}