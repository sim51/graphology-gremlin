import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../type";
import { Step } from "../generic";
/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
export declare class MapStep<S, T> extends Step<S, T> {
    label: string;
    fn: (source: Traverser<S>) => T;
    /**
     * Default constructor.
     */
    constructor(label: string, traversal: GraphTraversal<S, T>, fn: (source: Traverser<S>) => T);
    getLabel(): string;
    next(): IteratorResult<Traverser<T>>;
}
