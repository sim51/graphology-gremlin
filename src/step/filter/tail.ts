import { Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Step } from "../generic";

/**
 * Return the last items of the traversal values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#tail-step
 */
export class TailStep<T> extends Step<T, T> {
  last: number;
  items: Array<Traverser<T>> | null = null;
  currentIndex = -1;

  /**
   * Tail step  constructor
   *
   * @param label Name of the step
   * @param traversal GraphTraversal on which the step is applied
   * @param last Number of item the step should returns
   */
  constructor(traversal: GraphTraversal<unknown, T>, last = 1) {
    super(traversal);
    this.last = last;
  }

  /**
   * Get the label of the step
   */
  getLabel(): string {
    return `tailFilter`;
  }

  /**
   * Get the next item from the iterator.
   */
  next(): IteratorResult<Traverser<T>> {
    // if first call, then we build the tail
    if (this.currentIndex === -1) this.buildListOfItems();
    this.currentIndex += 1;

    if (this.items && this.items[this.currentIndex]) {
      return {
        done: false,
        value: this.items[this.currentIndex],
      };
    } else {
      return { done: true, value: null };
    }
  }

  private buildListOfItems(): void {
    if (this.start !== null) {
      let ir = this.start.next();
      while (!ir.done) {
        this.items = (this.items || []).concat([ir.value]).slice(-1 * this.last);
        ir = this.start.next();
      }
    }
  }
}
