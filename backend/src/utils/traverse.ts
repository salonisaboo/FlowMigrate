export function traverse(
    obj: unknown,
    callback: (key: string, value: unknown) => void
) {
    if (Array.isArray(obj)) {
        obj.forEach((item) => traverse(item, callback));
        return;
    }

    if (typeof obj === "object" && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
            callback(key, value);
            traverse(value, callback);
        }
    }
}