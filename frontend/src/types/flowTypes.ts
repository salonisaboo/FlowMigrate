export type DependencyType =
    | "customField"
    | "customObject"
    | "userId"
    | "subFlow"

export interface Dependency {
    type: DependencyType
    sourceValue: string
    targetValue?: string
    isResolved: boolean
}

export interface Flow {
    id: string
    name: string
    status: "parsed" | "deployed"
}