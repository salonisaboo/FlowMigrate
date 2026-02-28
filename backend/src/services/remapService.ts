export function remapFlow(
    flowJson: unknown,
    mappings: Record<string, string>
): unknown {

    function replace(obj: any): any {

        if (Array.isArray(obj)) {
            return obj.map(replace);
        }

        if (typeof obj === "object" && obj !== null) {

            const newObj: any = {};

            for (const [key, value] of Object.entries(obj)) {
                newObj[key] = replace(value);
            }

            return newObj;
        }

        if (typeof obj === "string" && mappings[obj]) {
            return mappings[obj];
        }

        return obj;
    }

    return replace(flowJson);
}