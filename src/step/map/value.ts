import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../types";
import { MapStep } from "./generic";

/**
 * The value()-step (map) takes a Property and extracts the value from it.
 * @see https://tinkerpop.apache.org/docs/current/reference/#value-step
 */
export class ValueStep extends MapStep<[string, unknown], unknown> {
  constructor(traversal: GraphTraversal<unknown, unknown>) {
    super("value", traversal, (traverser: Traverser<[string, unknown]>): unknown => {
      return traverser.value[1];
    });
  }
}
