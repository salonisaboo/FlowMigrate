import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:5000/api"
})

export const parseFlow = (flowJson: unknown) => {
    return API.post("/flows/parse", { flowJson })
}

export const deployFlow = (
    flowId: string,
    mappings: Record<string, string>
) => {
    return API.post("/flows/deploy", { flowId, mappings })
}

export const getFlows = () => {
    return API.get("/flows")
}