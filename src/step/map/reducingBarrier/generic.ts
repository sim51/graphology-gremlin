import { GraphTraversal } from "../../../traversal/graphTraversal";
import { Traverser } from "../../../type";
import { Step } from "../../generic";

/**
 * Reduce barrier step.
 * It iterates on the inputs values and returns a single value with a new traverser.
 * @see https://tinkerpop.apache.org/docs/current/reference/#a-note-on-barrier-steps
 */
export class ReducingBarrierStep<S, T> extends Step<S, T> {
  label: string;
  reducer: (previousValue: T, value: S, index: number, array: Array<S>) => T;
  initValue: T;

  /**
   * Default constructor.
   */
  constructor(
    label: string,
    traversal: GraphTraversal<unknown, T>,
    initValue: T,
    reducer: (previousValue: T, value: S, index: number, array: Array<S>) => T,
  ) {
    super(traversal);
    this.label = label;
    this.initValue = initValue;
    this.reducer = reducer;
  }

  getLabel(): string {
    return `${this.label}ReduceBarrier`;
  }

  next(): IteratorResult<Traverser<T>> {
    if (this.start === null) return { done: true, value: null };

    // get next iterator value and check if its already out
    let ir = this.start.next();
    if (ir.done) return { done: true, value: null };

    // consume the full iterator and build an array
    const startsValues: Array<S> = [];
    while (!ir.done) {
      startsValues.push(ir.value.value);
      ir = this.start.next();
    }
    // console.log(startsValues, startsValues.reduce(this.reducer, this.initValue));

    return {
      done: false,
      value: new Traverser<T>(startsValues.reduce(this.reducer, this.initValue)),
    };
  }
}
