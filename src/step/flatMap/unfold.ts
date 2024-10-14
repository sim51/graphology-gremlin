import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../types";
import { FlatMapStep } from "./generic";

/**
 * Unfold the traversal value.
 * @see https://tinkerpop.apache.org/docs/current/reference/#unfold-step
 */
export class UnfoldStep<T> extends FlatMapStep<Array<T>, T> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, T>) {
    super("unfold", traversal, (traverser: Traverser<Array<T>>): Iterator<T> => {
      return traverser.value[Symbol.iterator]();
    });
  }
}
