import type { ParsedFlow } from "../types/flowTypes.js";

export function resolveDeploymentOrder(flows: ParsedFlow[]): ParsedFlow[] {

    const graph = new Map<string, string[]>();
    const flowMap = new Map<string, ParsedFlow>();

    flows.forEach(flow => {

        flowMap.set(flow.name, flow);

        const subflows = flow.dependencies
            .filter(dep => dep.type === "subFlow")
            .map(dep => dep.sourceValue);

        graph.set(flow.name, subflows);

    });

    const visited = new Set<string>();
    const result: ParsedFlow[] = [];

    function dfs(name: string) {

        if (visited.has(name)) return;

        visited.add(name);

        const deps = graph.get(name) || [];

        deps.forEach(dep => {
            if (flowMap.has(dep)) dfs(dep);
        });

        const flow = flowMap.get(name);

        if (flow) result.push(flow);

    }

    flows.forEach(flow => dfs(flow.name));

    return result;
}