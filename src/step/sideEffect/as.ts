/**
 * Perform some operations on the traverser and pass it to the next step
 */
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../types";
import { Step } from "../generic";

/**
 * The as()-step is not a real step, but a "step modulator" similar to by() and option().
 * With as(), it is possible to provide a label to the step that can later be accessed by steps .
 * @see https://tinkerpop.apache.org/docs/current/reference/#as-step
 */
export class AsStep<T> extends Step<T, T> {
  name: string;

  constructor(traversal: GraphTraversal<unknown, T>, name: string) {
    super(traversal);
    this.name = name;
  }

  getLabel(): string {
    return `asSideEffect`;
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
        value: traverser.makeNextTraverser(this.getLabel(), ir.value.value).setAs(this.name),
      };
    }
  }
}
