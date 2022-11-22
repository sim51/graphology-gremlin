import { isNil } from "lodash";

import { Edge, Vertex, Traverser } from "../../types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";

/**
 * Filter the traverser if its element doesn't have one of the specified ids.
 * https://tinkerpop.apache.org/docs/current/reference/#has-step
 */
export class HasIdStep extends FilterStep<Edge | Vertex> {
  constructor(traversal: GraphTraversal<unknown, Edge | Vertex>, keys: Array<string | undefined>) {
    super("hasId", traversal, (traverser: Traverser<Edge | Vertex>): boolean => {
      if (keys && keys.filter((e) => !isNil(e))) {
        return keys.includes(traverser.value.id);
      }
      return true;
    });
  }
}
