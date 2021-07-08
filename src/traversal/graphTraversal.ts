import Graph from "graphology";
import { EdgeKey, NodeKey } from "graphology-types";
import { Step } from "../step/generic";
import { GraphConfiguration, Traverser, Vertex, Edge, Object } from "../type";
// import { Predicate } from "./predicate";

// Filter steps
// import { HasStep } from "../step/filter/has";
import { HasIdStep } from "../step/filter/hasId";
import { HasKeyStep } from "../step/filter/hasKey";
import { HasLabelStep } from "../step/filter/hasLabel";
import { HasNotStep } from "../step/filter/hasNot";

// Map steps
import { PropertiesStep } from "../step/map/properties";
import { IdentityStep } from "../step/map/identity";
// Map reducing barrier steps
import { CountStep } from "../step/map/reducingBarrier/count";
import { FoldStep } from "../step/map/reducingBarrier/fold";

// FlatMap steps
import { BothStep } from "../step/flatMap/both";
import { BothEStep } from "../step/flatMap/bothE";
import { BothVStep } from "../step/flatMap/bothV";
import { InStep } from "../step/flatMap/in";
import { InEStep } from "../step/flatMap/inE";
import { InVStep } from "../step/flatMap/inV";
import { OutStep } from "../step/flatMap/out";
import { OutEStep } from "../step/flatMap/outE";
import { OutVStep } from "../step/flatMap/outV";
import { OtherVStep } from "../step/flatMap/otherV";

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
export class GraphTraversal<S, E> implements Iterator<Traverser<E>> {
  private graph: Graph;
  private config: GraphConfiguration;
  private steps: Array<Step<any, any>> = [];
  private start: Iterator<Traverser<S>>;
  private target: Iterator<Traverser<E>> | null = null;

  constructor(
    graph: Graph,
    config: GraphConfiguration,
    start: Iterator<Traverser<S>>,
    steps: Array<Step<any, any>> = [],
  ) {
    this.graph = graph;
    this.config = config;
    this.start = start;
    this.steps = steps;
  }

  /**
   * Consume the iterator result.
   */
  next(): IteratorResult<Traverser<E>> {
    return this.getTarget().next();
  }

  /**
   * Add a step to the traversal.
   */
  addStep<T>(step: Step<unknown, T>): GraphTraversal<S, T> {
    return new GraphTraversal<S, T>(this.graph, this.config, this.start, this.steps.concat(step));
  }

  getGraph(): Graph {
    return this.graph;
  }

  getConfig(): GraphConfiguration {
    return this.config;
  }

  /**
   * Return the target iterator of the traversal.
   * The target iterator is created if it's not the case.
   * So this function in fact execute the traversal.
   */
  private getTarget(): Iterator<Traverser<E>> {
    if (this.target === null) {
      let target: Iterator<Traverser<any>> = this.start;
      this.steps.forEach((step: Step<any, any>) => {
        step.addStart(target);
        target = step;
      });
      this.target = target as Iterator<Traverser<E>>;
    }
    return this.target;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Filter steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // public has(
  //   arg1: string,
  //   arg2?: string | Predicate<Object> | unknown,
  //   arg3?: unknown,
  // ): GraphTraversal<S, Vertex | Edge | Object> {
  //   return this.addStep(new HasStep(this, arg1, arg2, arg3));
  // }
  public hasId(...keys: Array<EdgeKey> | Array<NodeKey>): GraphTraversal<S, Vertex | Edge> {
    return this.addStep(new HasIdStep(this, keys));
  }
  public hasKey(...keys: Array<string>): GraphTraversal<S, Edge | Vertex | Object> {
    return this.addStep(new HasKeyStep(this, keys));
  }
  public hasLabel(...labels: Array<string>): GraphTraversal<S, Vertex | Edge> {
    return this.addStep(new HasLabelStep(this, labels));
  }
  public hasNot(...keys: Array<string>): GraphTraversal<S, Edge | Vertex | Object> {
    return this.addStep(new HasNotStep(this, keys));
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Map steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public properties(...properties: Array<string>): GraphTraversal<S, Object> {
    return this.addStep(new PropertiesStep(this, properties));
  }
  public identity(): GraphTraversal<S, NodeKey | EdgeKey> {
    return this.addStep(new IdentityStep(this));
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Map reducing barrier steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public count(): GraphTraversal<S, number> {
    return this.addStep(new CountStep(this));
  }
  public fold(): GraphTraversal<S, Array<E>> {
    return this.addStep(new FoldStep<E>(this));
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ FlatMap steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public otherV(): GraphTraversal<S, Vertex> {
    return this.addStep(new OtherVStep(this));
  }
  public both(...labels: Array<string>): GraphTraversal<S, Vertex> {
    return this.addStep(new BothStep(this, labels));
  }
  public bothE(...labels: Array<string>): GraphTraversal<S, Edge> {
    return this.addStep(new BothEStep(this, labels));
  }
  public bothV(): GraphTraversal<S, Vertex> {
    return this.addStep(new BothVStep(this));
  }
  public in(...labels: Array<string>): GraphTraversal<S, Vertex> {
    return this.addStep(new InStep(this, labels));
  }
  public inE(...labels: Array<string>): GraphTraversal<S, Edge> {
    return this.addStep(new InEStep(this, labels));
  }
  public inV(): GraphTraversal<S, Vertex> {
    return this.addStep(new InVStep(this));
  }
  public out(...labels: Array<string>): GraphTraversal<S, Vertex> {
    return this.addStep(new OutStep(this, labels));
  }
  public outE(...labels: Array<string>): GraphTraversal<S, Edge> {
    return this.addStep(new OutEStep(this, labels));
  }
  public outV(): GraphTraversal<S, Vertex> {
    return this.addStep(new OutVStep(this));
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Terminal steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  /**
   * Give the traversal result as a list.
   */
  public toList(): Array<E> {
    const result: Array<E> = [];
    let ir = this.next();
    while (!ir.done) {
      result.push(ir.value.value);
      ir = this.next();
    }
    return result;
  }

  /**
   * Give the traversal result as a Set.
   * TODO: need to remove duplicates by checking there footprint ???
   */
  public toSet(): Set<E> {
    const result: Set<E> = new Set<E>();
    let ir = this.next();
    while (!ir.done) {
      result.add(ir.value.value);
      ir = this.next();
    }
    return result;
  }

  /**
   * Give the explain of the traversal.
   */
  public explain(): void {
    throw new Error("Not implemented");
  }
}
