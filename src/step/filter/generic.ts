import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../types";
import { Step } from "../generic";

/**
 * Map the traverser to either true or false, where false will not pass the traverser to the next step.
 * In short it filters the input.
 */
export class FilterStep<S> extends Step<S, S> {
  label: string;
  fn: (source: Traverser<S>) => boolean;

  /**
   * Filter step  constructor
   *
   * @param label Name of the step
   * @param traversal GraphTraversal on which the step is applied
   * @param fn The filter function, if value is <code>TRUE</code> the traversal result is kept otherwise it is dismissed
   */
  constructor(label: string, traversal: GraphTraversal<unknown, S>, fn: (source: Traverser<S>) => boolean) {
    super(traversal);
    this.label = label;
    this.fn = fn;
  }

  /**
   * Get the label of the step
   */
  getLabel(): string {
    return `${this.label}Filter`;
  }

  /**
   * Get the next item from the iterator.
   */
  next(): IteratorResult<Traverser<S>> {
    if (this.start === null) return { done: true, value: null };

    let ir = this.start.next();
    let nextFound = false;
    while (!ir.done && !nextFound) {
      nextFound = this.fn(ir.value);
      if (!nextFound) ir = this.start.next();
    }
    return ir;
  }
}
