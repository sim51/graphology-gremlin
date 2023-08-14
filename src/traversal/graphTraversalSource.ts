import Graph from "graphology";
import {
  Traverser,
  Vertex,
  Edge,
  DEFAULT_GRAPH_CONFIGURATION,
  NotImplemented,
  BaseGraph,
  GraphConfiguration,
} from "../types";
import { GraphTraversal } from "./graphTraversal";
// start steps
import { AddEStep } from "../step/start/addE";
import { AddVStep } from "../step/start/addV";
import { EStep } from "../step/start/E";
import { VStep } from "../step/start/V";
import { InjectStep } from "../step/sideEffect/inject";

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
  private graph: BaseGraph;

  constructor(graph: Graph) {
    graph.replaceAttributes(DEFAULT_GRAPH_CONFIGURATION);
    this.graph = graph as BaseGraph;
  }

  with(key: keyof GraphConfiguration, value: any): this {
    this.graph.mergeAttributes({ [key]: value });
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
  V(...ids: Array<string>): GraphTraversal<string, Vertex> {
    const nodes = (ids.length > 0 ? ids : this.graph.nodes()).map((id: string) => new Traverser(id));
    return new GraphTraversal<string, Vertex>(
      this.graph,
      nodes[Symbol.iterator](),
      [],
      (gt: GraphTraversal<string, Vertex>) => new VStep(gt),
    );
  }

  /**
   * Create a new vertex.
   */
  addV(): GraphTraversal<null | string, Vertex> {
    return new GraphTraversal<null | string, Vertex>(
      this.graph,
      this.emptyIterator(true),
      [],
      (gt: GraphTraversal<null | string, Vertex>) => new AddVStep(gt),
    );
  }

  /**
   * List all edges of the graph or a selection.
   */
  E(...ids: Array<string>): GraphTraversal<string, Edge> {
    const edges = (ids.length > 0 ? ids : this.graph.edges()).map((id: string) => new Traverser(id));
    return new GraphTraversal<string, Edge>(
      this.graph,
      edges[Symbol.iterator](),
      [],
      (gt: GraphTraversal<string, Edge>) => new EStep(gt),
    );
  }

  /**
   * Create a new edge.
   */
  addE(): GraphTraversal<null | string, Edge> {
    return new GraphTraversal<null | string, Edge>(
      this.graph,
      this.emptyIterator(true),
      [],
      (gt: GraphTraversal<null | string, Edge>) => new AddEStep(gt),
    );
  }

  inject<T>(...items: Array<T>): GraphTraversal<null, T> {
    return new GraphTraversal<null, T>(
      this.graph,
      this.emptyIterator(),
      [],
      (gt: GraphTraversal<null, T>) => new InjectStep<T>(gt, items),
    );
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Not yet implemented
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  withBulk(..._args: any[]): this {
    throw new NotImplemented("withBulk");
  }
  withSack(..._args: any[]): this {
    throw new NotImplemented("withSack");
  }
  withSideEffect(..._args: any[]): this {
    throw new NotImplemented("withSideEffect");
  }
  io(..._args: any[]): this {
    throw new NotImplemented("io");
  }

  private emptyIterator(withOneNummTraverser = false): Iterator<Traverser<null>> {
    return (withOneNummTraverser ? [new Traverser(null)] : [])[Symbol.iterator]();
  }
}
