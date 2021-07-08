import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../type";
import { Step } from "../generic";

/**
 * Map the traverser to an iterator of E objects that are streamed to the next step.
 */
export class FlatMapStep<S, E> extends Step<S, E> {
  private label: string;
  private fn: (source: Traverser<S>) => Iterator<E>;
  private innerIterator: Iterator<E> | null = null;
  private current: IteratorResult<Traverser<S>> | null = null;

  /**
   * Default constructor.
   */
  constructor(label: string, traversal: GraphTraversal<S, E>, fn: (source: Traverser<S>) => Iterator<E>) {
    super(traversal);
    this.label = label;
    this.fn = fn;
  }

  getLabel(): string {
    return this.label;
  }

  next(): IteratorResult<Traverser<E>> {
    // init the current and inner iterator by calling `nextInnerIterator`
    if (this.current === null && this.nextInnerIterator()) {
      return { done: true, value: null };
    }

    // if even after the init the iinter iter is null
    // we just return a done iter value
    if (this.innerIterator === null || this.current === null) {
      return { done: true, value: null };
    }

    // get the next item
    let iir = this.innerIterator.next();
    // search next one
    while (iir.done && !this.nextInnerIterator()) {
      iir = this.innerIterator.next();
    }
    if (iir.done) return { done: true, value: null };

    // compute the next element
    const item = iir.value;
    return {
      done: false,
      value: this.current.value.makeNextTraverser(this.getLabel(), item),
    };
  }

  /**
   * Populate the next inner iterator.
   * @returns if the main iterator is over or not
   */
  private nextInnerIterator(): boolean {
    if (this.start === null) return true;
    this.current = this.start.next();
    this.innerIterator = this.current.done ? [][Symbol.iterator]() : this.fn(this.current.value);
    return this.current.done ? this.current.done : true;
  }
}
