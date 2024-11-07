export const clearObj = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key as keyof T];
        if (value !== undefined && value !== null) {
            acc[key as keyof T] = value;
        }
        return acc;
    }, {} as Partial<T>);
}
