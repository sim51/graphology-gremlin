import { Edge, Vertex, Traverser } from "../../types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * The identity()-step (map) return the id of the graph element.
 * @see https://tinkerpop.apache.org/docs/current/reference/#id-step
 */
export class IdStep extends MapStep<Edge | Vertex, string> {
  constructor(traversal: GraphTraversal<unknown, string>) {
    super("id", traversal, (traverser: Traverser<Edge | Vertex>): string => {
      return traverser.value.id;
    });
  }
}
