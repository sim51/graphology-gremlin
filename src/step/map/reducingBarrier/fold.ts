import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the count of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#fold-step
 */
export class FoldStep<T> extends ReducingBarrierStep<T, Array<T>> {
  constructor(traversal: GraphTraversal<any, any>) {
    super("fold", traversal, new Array<T>(), (previousValue: Array<T>, value: T) => {
      previousValue.push(value);
      return previousValue;
    });
  }
}
