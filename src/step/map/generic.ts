import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../types";
import { Step } from "../generic";

/**
 * Map the traverser of type S to some object of type T for the next step to process.
 */
export class MapStep<S, T> extends Step<S, T> {
  label: string;
  fn: (source: Traverser<S>) => T;

  /**
   * Default constructor.
   */
  constructor(label: string, traversal: GraphTraversal<unknown, T>, fn: (source: Traverser<S>) => T) {
    super(traversal);
    this.label = label;
    this.fn = fn;
  }

  getLabel(): string {
    return `${this.label}Map`;
  }

  next(): IteratorResult<Traverser<T>> {
    if (this.start === null) return { done: true, value: null };

    const ir = this.start.next();
    if (ir.done) return { done: true, value: null };
    else {
      // execute the step with the map function
      const traverser = ir.value;
      return {
        done: ir.done,
        value: traverser.makeNextTraverser(this.getLabel(), this.fn(traverser)),
      };
    }
  }
}
