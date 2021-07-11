import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";

/**
 * Return a range of the traverser values where low is inclusive and high is exclusive.
 * @see https://tinkerpop.apache.org/docs/current/reference/#range-step
 */
export class RangeStep<T> extends FilterStep<T> {
  index = -1;

  constructor(traversal: GraphTraversal<unknown, T>, start: number, end: number) {
    super("range", traversal, (): boolean => {
      this.index += 1;
      return this.index >= start - 1 && this.index < end - 1 ? true : false;
    });
  }
}
