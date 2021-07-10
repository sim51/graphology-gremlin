import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the min of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#sum-step
 */
export class MinStep extends ReducingBarrierStep<number, number> {
  constructor(traversal: GraphTraversal<unknown, number>) {
    super("min", traversal, +Infinity, (previousValue: number, value: number) => {
      return previousValue > +value ? +value : previousValue;
    });
  }
}
