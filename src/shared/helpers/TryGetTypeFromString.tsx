export function tryGetTypeFromString<T>(value: string, isCollection: boolean): T | undefined {
    try {
        const startIndex = value.indexOf(isCollection ? '[' : '{');
        const endIndex = value.lastIndexOf(isCollection ? ']' : '}');

        const json = value.substring(startIndex, endIndex + 1);

        const result = JSON.parse(json) as T;

        return result;
    } 
    catch (e) {
        console.error(e);

        return undefined;
    }
}