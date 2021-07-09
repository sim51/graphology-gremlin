import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the count of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#count-step
 */
export class CountStep extends ReducingBarrierStep<unknown, number> {
  constructor(traversal: GraphTraversal<unknown, number>) {
    super("count", traversal, 0, (previousValue: number) => {
      previousValue += 1;
      return previousValue;
    });
  }
}
