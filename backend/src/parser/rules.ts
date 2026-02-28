export const userIdRegex = /005[a-zA-Z0-9]{12,15}/;

export function isCustomField(value: string): boolean {
    return value.includes(".") && value.endsWith("__c");
}

export function isCustomObject(value: string): boolean {
    return !value.includes(".") && value.endsWith("__c");
}

export function isUserId(value: string): boolean {
    return userIdRegex.test(value);
}