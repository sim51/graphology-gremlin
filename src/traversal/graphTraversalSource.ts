import Graph from "graphology";
import { NodeKey, EdgeKey } from "graphology-types";
import { Traverser, Vertex, Edge, GraphConfiguration, DEFAULT_GRAPH_CONFIGURATION } from "../type";
import { GraphTraversal } from "./graphTraversal";
// start steps
import { AddEStep } from "../step/graph/addE";
import { AddVStep } from "../step/graph/addV";
import { EStep } from "../step/graph/E";
import { VStep } from "../step/graph/V";

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
  public V<E>(...ids: Array<NodeKey>): GraphTraversal<NodeKey, Vertex> {
    const nodes = (ids.length > 0 ? ids : this.graph.nodes()).map((id: NodeKey) => new Traverser(id));
    const gt = new GraphTraversal<NodeKey, NodeKey>(this.graph, this.config, nodes[Symbol.iterator]());
    return gt.addStep(new VStep(gt));
  }

  /**
   * Create a new vertex.
   */
  public addV<E>(): GraphTraversal<null | string, Vertex> {
    const gt = new GraphTraversal<null | string, null | string>(this.graph, this.config, this.emptyIterator());
    return gt.addStep(new AddVStep(gt));
  }

  /**
   * List all edges of the graph or a selection.
   */
  public E<E>(...ids: Array<EdgeKey>): GraphTraversal<EdgeKey, Edge> {
    const edges = (ids.length > 0 ? ids : this.graph.edges()).map((id: EdgeKey) => new Traverser(id));
    const gt = new GraphTraversal<EdgeKey, EdgeKey>(this.graph, this.config, edges[Symbol.iterator]());
    return gt.addStep(new EStep(gt));
  }

  /**
   * Create a new edge.
   */
  public addE<E>(): GraphTraversal<null | string, Edge> {
    const gt = new GraphTraversal<null | string, null | string>(this.graph, this.config, this.emptyIterator());
    return gt.addStep(new AddEStep(gt));
  }

  private emptyIterator(): Iterator<Traverser<null>> {
    return [null][Symbol.iterator]();
  }
}
