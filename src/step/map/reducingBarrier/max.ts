import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the max value of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#max-step
 */
export class MaxStep extends ReducingBarrierStep<number, number> {
  constructor(traversal: GraphTraversal<unknown, number>) {
    super("max", traversal, -Infinity, (previousValue: number, value: number) => {
      return previousValue < +value ? +value : previousValue;
    });
  }
}
