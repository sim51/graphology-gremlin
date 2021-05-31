import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../type";
import { Step } from "../generic";
/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
export declare class FilterStep<S> extends Step<S, S> {
    label: string;
    fn: (source: Traverser<S>) => boolean;
    /**
     * Default constructor.
     */
    constructor(label: string, traversal: GraphTraversal<S, S>, fn: (source: Traverser<S>) => boolean);
    getLabel(): string;
    next(): IteratorResult<Traverser<S>>;
}
