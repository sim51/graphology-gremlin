import { GraphTraversal } from "../traversal/graphTraversal";
import { Order, Traverser } from "../types";

/**
 * Extract of https://github.com/apache/tinkerpop/blob/master/gremlin-core/src/main/java/org/apache/tinkerpop/gremlin/process/traversal/Step.java
 *
 * A {@link Step} denotes a unit of computation within a {@link Traversal}.
 * A step takes an incoming object and yields an outgoing object.
 * Steps are chained together in a {@link Traversal} to yield a lazy function chain of computation.
 * <p/>
 * In the constructor of a Step, never store explicit sideEffect objects in {@link TraversalSideEffects}.
 * If a sideEffect needs to be registered with the {@link Traversal}, use SideEffects.registerSupplier().
 *
 * @param <S> The incoming object type of the step
 * @param <E> The outgoing object type of the step
 */
export abstract class Step<S, E> implements Iterator<Traverser<E>> {
  /**
   * Traversal of which the step behave.
   */
  traversal: GraphTraversal<unknown, E>;

  /**
   * Start objects of the step.
   */
  start: Iterator<Traverser<S>> | null = null;

  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, E>) {
    this.traversal = traversal;
  }

  /**
   *  Add the starts item for the step.
   */
  addStart(iterator: Iterator<Traverser<S>>): void {
    this.start = iterator;
  }

  by(name?: string, order?: Order | string): void {
    throw new Error(`By ${name} ${order} not available for ${this.getLabel()}`);
  }

  /**
   * Get the name of the step.
   */
  abstract getLabel(): string;

  /**
   * Iterator next
   */
  abstract next(): IteratorResult<Traverser<E>>;
}
