import { NodeKey } from "graphology-types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Path, Traverser, Vertex } from "../../type";
import { Step } from "../generic";

/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
export class MapStep<S, T> extends Step<S, T> {
  label: string;
  fn: (source: Traverser<S>) => T;

  /**
   * Default constructor.
   */
  constructor(label: string, traversal: GraphTraversal<S, T>, fn: (source: Traverser<S>) => T) {
    super(traversal);
    this.label = label;
    this.fn = fn;
  }

  getLabel(): string {
    return this.label;
  }

  next(): IteratorResult<Traverser<T>> {
    const ir = this.start.next();
    if (ir.done) return ir;
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
