/**
 * Perform some operations on the traverser and pass it to the next step
 */
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../type";
import { Step } from "../generic";

/**
 * Map the traverser of type S to some object of type T for the next step to process.
 */
export class InjectStep<T> extends Step<T, T> {
  items: Array<T>;
  index = -1;

  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, T>, items: Array<T>) {
    super(traversal);
    this.items = items;
  }

  getLabel(): string {
    return `injectSideEffect`;
  }

  next(): IteratorResult<Traverser<T>> {
    this.index += 1;
    if (this.index <= this.items.length - 1) {
      return {
        done: false,
        value: new Traverser(this.items[this.index]),
      };
    } else {
      if (this.start === null) return { done: true, value: null };
      const ir = this.start.next();
      if (ir.done) return { done: true, value: null };
      else {
        // execute the step with the map function
        const traverser = ir.value;
        return {
          done: ir.done,
          value: traverser.makeNextTraverser(this.getLabel(), traverser.value),
        };
      }
    }
  }
}
