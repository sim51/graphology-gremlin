export declare class Traverser<S> {
    value: S;
    path: Array<{
        label: string;
        value: unknown;
    }>;
    constructor(value: S, path?: Array<{
        label: string;
        value: unknown;
    }>);
    get(): S;
    getPath(): Array<{
        label: string;
        value: unknown;
    }>;
    makeNextTraverser<T>(label: string, value: T): Traverser<T>;
}
