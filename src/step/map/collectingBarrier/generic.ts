import { GraphTraversal } from "../../../traversal/graphTraversal";
import { Traverser } from "../../../types";
import { Step } from "../../generic";

/**
 * Collecting barrier step.
 * It iterates on the inputs values, do some computation and returns them to the nextstep.
 * @see https://tinkerpop.apache.org/docs/current/reference/#a-note-on-barrier-steps
 */
export class CollectingBarrierStep<S, T> extends Step<S, T> {
  label: string;
  iteratorResult: Iterator<Traverser<T>> | null = null;
  process: (values: Array<Traverser<S>>) => Array<Traverser<T>>;

  /**
   * Default constructor.
   */
  constructor(
    label: string,
    traversal: GraphTraversal<unknown, T>,
    process: (values: Array<Traverser<S>>) => Array<Traverser<T>>,
  ) {
    super(traversal);
    this.label = label;
    this.process = process;
  }

  getLabel(): string {
    return `${this.label}CollectingBarrier`;
  }

  next(): IteratorResult<Traverser<T>> {
    if (this.start === null) return { done: true, value: null };

    // do collect and process
    if (this.iteratorResult === null) {
      // get next iterator value and check if its already out
      let ir = this.start.next();
      if (ir.done) return { done: true, value: null };

      // consume the full iterator and build an array
      const startsValues: Array<Traverser<S>> = [];
      while (!ir.done) {
        startsValues.push(ir.value);
        ir = this.start.next();
      }
      this.iteratorResult = this.process(startsValues)[Symbol.iterator]();
      return this.iteratorResult.next();
    } else {
      return this.iteratorResult.next();
    }
  }
}
