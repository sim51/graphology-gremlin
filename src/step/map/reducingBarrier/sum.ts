import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the sum of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#sum-step
 */
export class SumStep extends ReducingBarrierStep<number, number> {
  constructor(traversal: GraphTraversal<unknown, number>) {
    super("sum", traversal, 0, (previousValue: number, value: number) => {
      return previousValue + +value;
    });
  }
}
