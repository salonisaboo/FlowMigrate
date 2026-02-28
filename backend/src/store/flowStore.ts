import type { StoredFlow } from "../types/flowTypes.js";

class FlowStore {
    private flows: Map<string, StoredFlow> = new Map();

    addFlow(id: string, flow: StoredFlow) {
        this.flows.set(id, flow);
    }

    getFlow(id: string) {
        return this.flows.get(id);
    }

    getAllFlows() {
        return Array.from(this.flows.entries()).map(([id, flow]) => ({
            id,
            name: flow.parsedFlow.name,
            status: flow.status
        }));
    }

    updateStatus(id: string, status: "parsed" | "deployed") {
        const flow = this.flows.get(id);
        if (flow) flow.status = status;
    }
}

export const flowStore = new FlowStore();