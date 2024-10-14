import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser, Values } from "../../types";
import { MapStep } from "./generic";

/**
 * Return the named values of the traversal value as a js object.
 * @see https://tinkerpop.apache.org/docs/current/reference/#select-step
 */
export class SelectStep extends MapStep<unknown, Values> {
  constructor(traversal: GraphTraversal<unknown, Values>, names: Array<string>) {
    super("selectMap", traversal, (traverser: Traverser<unknown>): Values => {
      const result: Values = {};
      names.forEach((name: string) => {
        result[name] = traverser.getAs(name);
      });
      return result;
    });
  }
}
