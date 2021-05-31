import Graph from "graphology";
import { NodeKey, EdgeKey } from "graphology-types";
import { Vertex, Edge, GraphConfiguration } from "../type";
import { GraphTraversal } from "./graphTraversal";
/**
 * Extract of https://github.com/apache/tinkerpop/blob/master/gremlin-core/src/main/java/org/apache/tinkerpop/gremlin/process/traversal/TraversalSource.java
 *
 * A {@code TraversalSource} is used to create {@link Traversal} instances.
 * A traversal source can generate any number of {@link Traversal} instances.
 * A traversal source is primarily composed of a {@link Graph} and a {@link TraversalStrategies}.
 * Various {@code withXXX}-based methods are used to configure the traversal strategies (called "configurations").
 * Various other methods (dependent on the traversal source type) will then generate a traversal given the graph and configured strategies (called "spawns").
 * A traversal source is immutable in that fluent chaining of configurations create new traversal sources.
 * This is unlike {@link Traversal} and {@link GraphComputer}, where chained methods configure the same instance.
 * Every traversal source implementation must maintain two constructors to enable proper reflection-based construction.
 * <p/>
 * {@code TraversalSource(Graph)} and {@code TraversalSource(Graph,TraversalStrategies)}
 *
 * @author Marko A. Rodriguez (http://markorodriguez.com)
 * @author Stephen Mallette (http://stephen.genoprime.com)
 */
export declare class GraphTraversalSource {
    private graph;
    private config;
    constructor(graph: Graph);
    with(key: keyof GraphConfiguration, value: string): this;
    /**
     * List all vertex of the graph or a selection.
     */
    V<E>(...ids: Array<NodeKey>): GraphTraversal<NodeKey, Vertex>;
    /**
     * Create a new vertex.
     */
    addV<E>(): GraphTraversal<null, Vertex>;
    /**
     * List all edges of the graph or a selection.
     */
    E<E>(...ids: Array<EdgeKey>): GraphTraversal<EdgeKey, Edge>;
    /**
     * Create a new edge.
     */
    addE<E>(): GraphTraversal<null, Edge>;
    inject(): GraphTraversal<any, any>;
}
