import Graph from "graphology";
import { EdgeKey, NodeKey } from "graphology-types";
import { Step } from "../step/generic";
import { GraphConfiguration, Traverser, Vertex, Edge, Values } from "../type";
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
export class GraphTraversal<S, E> implements Iterator<E> {
  private graph: Graph;
  private config: GraphConfiguration;
  private steps: Array<Step<unknown, unknown>> = [];
  private start: Iterator<Traverser<S>>;
  private target: Iterator<Traverser<E>> | null = null;

  constructor(
    graph: Graph,
    config: GraphConfiguration,
    start: Iterator<Traverser<S>>,
    steps: Array<Step<unknown, unknown>> = [],
    newStep?: (gt: GraphTraversal<S, E>) => Step<unknown, E>,
  ) {
    this.graph = graph;
    this.config = config;
    this.start = start;
    this.steps = newStep ? steps.concat(newStep(this)) : steps;
  }

  /**
   * Consume the iterator result.
   */
  public next(): IteratorResult<E> {
    const ir = this.getTarget().next();
    return {
      done: ir.done,
      value: ir.value ? ir.value.value : null,
    };
  }

  public getGraph(): Graph {
    return this.graph;
  }

  public getConfig(): GraphConfiguration {
    return this.config;
  }

  /**
   * Give the traversal result as a list.
   */
  public toList(): Array<E> {
    const result: Array<E> = [];
    let ir = this.next();
    while (!ir.done) {
      result.push(ir.value);
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
      result.add(ir.value);
      ir = this.next();
    }
    return result;
  }

  /**
   * Give the explain of the traversal.
   */
  public explain(): string {
    return this.steps.map(s => s.getLabel()).join(" -> ");
  }

  /**
   * Add a step to the traversal.
   */
  public addStep<T>(stepBuilder: (gt: GraphTraversal<S, T>) => Step<unknown, T>): GraphTraversal<S, T> {
    return new GraphTraversal<S, T>(this.graph, this.config, this.start, this.steps, stepBuilder);
  }

  /**
   * Return the target iterator of the traversal.
   * The target iterator is created if it's not the case.
   * So this function in fact execute the traversal.
   */
  private getTarget(): Iterator<Traverser<E>> {
    if (this.target === null) {
      let target: Iterator<Traverser<unknown>> = this.start;
      this.steps.forEach((step: Step<unknown, unknown>) => {
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
  //   arg2?: string | Predicate<Values> | unknown,
  //   arg3?: unknown,
  // ): GraphTraversal<S, Vertex | Edge | Values> {
  //   returnthis.addStep(() => {new HasStep(this, arg1, arg2, arg3));
  // }
  public hasId(...keys: Array<EdgeKey> | Array<NodeKey>): GraphTraversal<S, Vertex | Edge> {
    return this.addStep((gt: GraphTraversal<S, Vertex | Edge>) => new HasIdStep(gt, keys));
  }
  public hasKey(...keys: Array<string>): GraphTraversal<S, Edge | Vertex | Values> {
    return this.addStep((gt: GraphTraversal<S, Edge | Vertex | Values>) => new HasKeyStep(gt, keys));
  }
  public hasLabel(...labels: Array<string>): GraphTraversal<S, Vertex | Edge> {
    return this.addStep((gt: GraphTraversal<S, Vertex | Edge>) => new HasLabelStep(gt, labels));
  }
  public hasNot(...keys: Array<string>): GraphTraversal<S, Edge | Vertex | Values> {
    return this.addStep((gt: GraphTraversal<S, Vertex | Edge | Values>) => new HasNotStep(gt, keys));
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Map steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public properties(...properties: Array<string>): GraphTraversal<S, Values> {
    return this.addStep((gt: GraphTraversal<S, Values>) => new PropertiesStep(gt, properties));
  }
  public identity(): GraphTraversal<S, NodeKey | EdgeKey> {
    return this.addStep((gt: GraphTraversal<S, NodeKey | EdgeKey>) => new IdentityStep(gt));
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ Map reducing barrier steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public count(): GraphTraversal<S, number> {
    return this.addStep((gt: GraphTraversal<S, number>) => new CountStep(gt));
  }
  public fold(): GraphTraversal<S, Array<E>> {
    return this.addStep((gt: GraphTraversal<S, Array<E>>) => new FoldStep<E>(gt));
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~ FlatMap steps
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public otherV(): GraphTraversal<S, Vertex> {
    return this.addStep((gt: GraphTraversal<S, Vertex>) => new OtherVStep(gt));
  }
  public both(...labels: Array<string>): GraphTraversal<S, Vertex> {
    return this.addStep((gt: GraphTraversal<S, Vertex>) => new BothStep(gt, labels));
  }
  public bothE(...labels: Array<string>): GraphTraversal<S, Edge> {
    return this.addStep((gt: GraphTraversal<S, Edge>) => new BothEStep(gt, labels));
  }
  public bothV(): GraphTraversal<S, Vertex> {
    return this.addStep((gt: GraphTraversal<S, Vertex>) => new BothVStep(gt));
  }
  public in(...labels: Array<string>): GraphTraversal<S, Vertex> {
    return this.addStep((gt: GraphTraversal<S, Vertex>) => new InStep(gt, labels));
  }
  public inE(...labels: Array<string>): GraphTraversal<S, Edge> {
    return this.addStep((gt: GraphTraversal<S, Edge>) => new InEStep(gt, labels));
  }
  public inV(): GraphTraversal<S, Vertex> {
    return this.addStep((gt: GraphTraversal<S, Vertex>) => new InVStep(gt));
  }
  public out(...labels: Array<string>): GraphTraversal<S, Vertex> {
    return this.addStep((gt: GraphTraversal<S, Vertex>) => new OutStep(gt, labels));
  }
  public outE(...labels: Array<string>): GraphTraversal<S, Edge> {
    return this.addStep((gt: GraphTraversal<S, Edge>) => new OutEStep(gt, labels));
  }
  public outV(): GraphTraversal<S, Vertex> {
    return this.addStep((gt: GraphTraversal<S, Vertex>) => new OutVStep(gt));
  }
}
