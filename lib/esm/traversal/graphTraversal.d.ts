import Graph from "graphology";
import { Step } from "../step/generic";
import { GraphConfiguration, Traverser } from "../type";
/**
 * Extract from https://github.com/apache/tinkerpop/blob/master/gremlin-core/src/main/java/org/apache/tinkerpop/gremlin/process/traversal/Traversal.java
 *
 * A {@link Traversal} represents a directed walk over a {@link Graph}.
 * This is the base interface for all traversal's, where each extending interface is seen as a domain specific language.
 * For example, {@link GraphTraversal} is a domain specific language for traversing a graph using "graph concepts" (e.g. vertices, edges).
 * Another example may represent the graph using "social concepts" (e.g. people, cities, artifacts).
 * A {@link Traversal} is evaluated in one of two ways: iterator-based OLTP or {@link GraphComputer}-based OLAP.
 * OLTP traversals leverage an iterator and are executed within a single JVM (with data access allowed to be remote).
 * OLAP traversals leverage {@link GraphComputer} and are executed between multiple JVMs (and/or cores).
 *
 * @author Marko A. Rodriguez (http://markorodriguez.com)
 */
export declare class GraphTraversal<S, E> implements Iterator<Traverser<E>> {
    private graph;
    private config;
    private steps;
    private start;
    private target;
    constructor(graph: Graph, config: GraphConfiguration);
    /**
     * Consume the iterator result.
     */
    next(): IteratorResult<Traverser<E>>;
    /**
     * Add a step to the traversal.
     */
    addStep(step: Step<any, any>): this;
    /**
     * Add a start to the traversal.
     */
    addStart(start: Iterator<Traverser<S>>): this;
    getGraph(): Graph;
    getConfig(): GraphConfiguration;
    /**
     * Return the target iterator of the traversal.
     * The target iterator is created if it's not the case.
     * So this function in fact execute the traversal.
     */
    private getTarget;
    hasLabel(label: string): this;
    /**
     * Give the traversal result as a list.
     */
    toList(): Array<E>;
    /**
     * Give the traversal result as a Set.
     * TODO: need to remove duplicates by checking there footprint ???
     */
    toSet(): Set<E>;
    /**
     * Give the explain of the traversal.
     */
    explain(): void;
}
