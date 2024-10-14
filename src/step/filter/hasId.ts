import { GraphTraversal } from "../../traversal/graphTraversal";
import { Edge, Traverser, Vertex } from "../../types";
import { FilterStep } from "./generic";

/**
 * Filter the traverser if its element doesn't have one of the specified ids.
 * https://tinkerpop.apache.org/docs/current/reference/#has-step
 */
export class HasIdStep extends FilterStep<Edge | Vertex> {
  constructor(traversal: GraphTraversal<unknown, Edge | Vertex>, keys: Array<string> | Array<string>) {
    super("hasId", traversal, (traverser: Traverser<Edge | Vertex>): boolean => {
      return keys.includes(traverser.value.id);
    });
  }
}
