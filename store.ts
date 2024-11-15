export function getValue(key: string): string {
    if (!hasValue(key)) {
        return "";
    }

    return keyValueStore[key];
}

export function setValue(key: string, value: string): void {
    keyValueStore[key] = value;
}

export function hasValue(key: string): boolean {
    return key in keyValueStore;
}

const keyValueStore: Record<string, string> = {};
