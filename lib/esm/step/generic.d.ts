import { GraphTraversal } from "../traversal/graphTraversal";
import { Traverser } from "../type";
export declare abstract class Step<S, E> implements Iterator<Traverser<E>> {
    traversal: GraphTraversal<unknown, E>;
    start: Iterator<Traverser<S>> | null;
    constructor(traversal: GraphTraversal<unknown, E>);
    addStart(iterator: Iterator<Traverser<S>>): void;
    abstract getLabel(): string;
    abstract next(): IteratorResult<Traverser<E>>;
}
