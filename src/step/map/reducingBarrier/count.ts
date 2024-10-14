import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";

/**
 * Return the count of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#count-step
 */
export class CountStep extends ReducingBarrierStep<unknown, number> {
  constructor(traversal: GraphTraversal<unknown, number>) {
    super("count", traversal, 0, (previousValue: number) => {
      return previousValue + 1;
    });
  }
}

export const count = <T>(): GraphTraversal<T, number> => {
  return GraphTraversal.newEmpty().count() as unknown as GraphTraversal<T, number>;
};
