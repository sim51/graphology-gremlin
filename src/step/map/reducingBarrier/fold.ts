import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Aggregate the incoming values into an array
 * @see https://tinkerpop.apache.org/docs/current/reference/#fold-step
 */
export class FoldStep<T> extends ReducingBarrierStep<T, Array<T>> {
  constructor(traversal: GraphTraversal<unknown, Array<T>>) {
    super("fold", traversal, new Array<T>(), (previousValue: Array<T>, value: T) => {
      previousValue.push(value);
      return previousValue;
    });
  }
}
