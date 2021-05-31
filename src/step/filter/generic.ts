import { NodeKey } from "graphology-types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Path, Traverser, Vertex } from "../../type";
import { Step } from "../generic";

/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
export class FilterStep<S> extends Step<S, S> {
  label: string;
  fn: (source: Traverser<S>) => boolean;

  /**
   * Default constructor.
   */
  constructor(label: string, traversal: GraphTraversal<S, S>, fn: (source: Traverser<S>) => boolean) {
    super(traversal);
    this.label = label;
    this.fn = fn;
  }

  getLabel(): string {
    return this.label;
  }

  next(): IteratorResult<Traverser<S>> {
    let ir = this.start.next();
    let nextFound = false;
    while (!ir.done && !nextFound) {
      nextFound = this.fn(ir.value);
      if (!nextFound) ir = this.start.next();
    }
    return ir;
  }
}
