import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the min of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#sum-step
 */
export class MeanStep extends ReducingBarrierStep<number, number> {
  constructor(traversal: GraphTraversal<unknown, number>) {
    super("mean", traversal, 0, (previousValue: number, value: number, _index: number, array: Array<number>) => {
      previousValue = previousValue + +value / array.length;
      return previousValue;
    });
  }
}
