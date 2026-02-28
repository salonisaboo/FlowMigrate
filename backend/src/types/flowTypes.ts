export type DependencyType =
    | "customField"
    | "customObject"
    | "userId"
    | "subFlow";

export interface Dependency {
    type: DependencyType
    sourceValue: string
    targetValue?: string | undefined
    isResolved: boolean
}

export interface ParsedFlow {
    id: string;
    name: string;
    label: string;
    triggerObjectType: string;
    dependencies: Dependency[];
}

export interface StoredFlow {
    parsedFlow: ParsedFlow;
    originalJson: unknown;
    status: "parsed" | "deployed";
}