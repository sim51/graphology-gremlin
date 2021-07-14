import { EdgeKey, NodeKey } from "graphology-types";
import { Edge, Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * The identity()-step (map) return the id of the graph element.
 * @see https://tinkerpop.apache.org/docs/current/reference/#id-step
 */
export class IdStep extends MapStep<Edge | Vertex, NodeKey | EdgeKey> {
  constructor(traversal: GraphTraversal<unknown, NodeKey | EdgeKey>) {
    super("id", traversal, (traverser: Traverser<Edge | Vertex>): NodeKey | EdgeKey => {
      return traverser.value.id;
    });
  }
}
