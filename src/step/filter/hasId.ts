import { EdgeKey, NodeKey } from "graphology-types";
import { Edge, Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";

/**
 * Filter the traverser if its element doesn't have one of the specified ids.
 * https://tinkerpop.apache.org/docs/current/reference/#has-step
 */
export class HasIdStep extends FilterStep<Edge | Vertex> {
  constructor(traversal: GraphTraversal<any, any>, keys: Array<EdgeKey> | Array<NodeKey>) {
    super("hasId", traversal, (traverser: Traverser<Edge | Vertex>): boolean => {
      return keys.includes(traverser.value.id);
    });
  }
}
