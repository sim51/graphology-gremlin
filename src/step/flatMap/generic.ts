import { NodeKey } from "graphology-types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Path, Traverser } from "../../type";
import { Step } from "../generic";

/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
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
    // init
    if (this.current === null) {
      if (this.nextInnerIterator()) return { done: true, value: undefined };
    }

    // get the next item
    let iir = this.innerIterator.next();
    // serach next one
    while (iir.done && !this.nextInnerIterator()) {
      iir = this.innerIterator.next();
    }
    if (iir.done) return { done: true, value: undefined };

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
    this.current = this.start.next();
    this.innerIterator = this.current.done ? [][Symbol.iterator]() : this.fn(this.current.value);
    return this.current.done;
  }
}
