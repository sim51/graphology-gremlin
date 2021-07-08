import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the count of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#count-step
 */
export class CountStep extends ReducingBarrierStep<unknown, number> {
  constructor(traversal: GraphTraversal<any, any>) {
    super("count", traversal, 0, (accumulator: number): number => accumulator + 1);
  }
}
