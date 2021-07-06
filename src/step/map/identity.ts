import { EdgeKey, NodeKey } from "graphology-types";
import { Edge, Vertex, Object, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * The identity()-step (map) is an identity function which maps the current object to itself.
 * @see https://tinkerpop.apache.org/docs/current/reference/#identity-step
 */
export class IdentityStep extends MapStep<Edge | Vertex, NodeKey | EdgeKey> {
  constructor(traversal: GraphTraversal<any, any>) {
    super("identity", traversal, (traverser: Traverser<Edge | Vertex>): NodeKey | EdgeKey => {
      return traverser.value.id;
    });
  }
}
