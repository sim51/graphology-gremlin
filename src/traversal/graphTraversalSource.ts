import Graph from "graphology";
import { NodeKey, EdgeKey } from "graphology-types";
import { Traverser, Vertex, Edge, GraphConfiguration, DEFAULT_GRAPH_CONFIGURATION } from "../type";
import { GraphTraversal } from "./graphTraversal";
// start steps
import { AddEStep } from "../step/start/addE";
import { AddVStep } from "../step/start/addV";
import { EStep } from "../step/start/E";
import { VStep } from "../step/start/V";

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
export class GraphTraversalSource {
  private graph: Graph;
  private config: GraphConfiguration = DEFAULT_GRAPH_CONFIGURATION;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  with(key: keyof GraphConfiguration, value: string): this {
    this.config[key] = value;
    return this;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Start steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Those steps are executed directly and result are passed to the traversal
  // constructor for its start
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  /**
   * List all vertex of the graph or a selection.
   */
  public V(...ids: Array<NodeKey>): GraphTraversal<NodeKey, Vertex> {
    const nodes = (ids.length > 0 ? ids : this.graph.nodes()).map((id: NodeKey) => new Traverser(id));
    return new GraphTraversal<NodeKey, Vertex>(
      this.graph,
      this.config,
      nodes[Symbol.iterator](),
      [],
      (gt: GraphTraversal<NodeKey, Vertex>) => new VStep(gt),
    );
  }

  /**
   * Create a new vertex.
   */
  public addV(): GraphTraversal<null | string, Vertex> {
    return new GraphTraversal<null | string, Vertex>(
      this.graph,
      this.config,
      this.emptyIterator(),
      [],
      (gt: GraphTraversal<null | string, Vertex>) => new AddVStep(gt),
    );
  }

  /**
   * List all edges of the graph or a selection.
   */
  public E(...ids: Array<EdgeKey>): GraphTraversal<EdgeKey, Edge> {
    const edges = (ids.length > 0 ? ids : this.graph.edges()).map((id: EdgeKey) => new Traverser(id));
    return new GraphTraversal<EdgeKey, Edge>(
      this.graph,
      this.config,
      edges[Symbol.iterator](),
      [],
      (gt: GraphTraversal<EdgeKey, Edge>) => new EStep(gt),
    );
  }

  /**
   * Create a new edge.
   */
  public addE(): GraphTraversal<null | string, Edge> {
    return new GraphTraversal<null | string, Edge>(
      this.graph,
      this.config,
      this.emptyIterator(),
      [],
      (gt: GraphTraversal<null | string, Edge>) => new AddEStep(gt),
    );
  }

  private emptyIterator(): Iterator<Traverser<null>> {
    return [new Traverser(null)][Symbol.iterator]();
  }
}
