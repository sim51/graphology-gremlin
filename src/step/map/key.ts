import { Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * The key()-step (map) takes a Property and extracts the key from it.
 * @see https://tinkerpop.apache.org/docs/current/reference/#key-step
 */
export class KeyStep extends MapStep<[string, unknown], string> {
  constructor(traversal: GraphTraversal<unknown, string>) {
    super("key", traversal, (traverser: Traverser<[string, unknown]>): string => {
      return traverser.value[0];
    });
  }
}
