import { Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * The identity()-step (map) is an identity function which maps the current object to itself.
 * @see https://tinkerpop.apache.org/docs/current/reference/#identity-step
 */
export class IdentityStep<T> extends MapStep<T, T> {
  constructor(traversal: GraphTraversal<unknown, T>) {
    super(
      "identity",
      traversal,
      (traverser: Traverser<T>): T => {
        return traverser.value;
      },
    );
  }
}
