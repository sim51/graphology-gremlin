import { GraphTraversal } from "../../traversal/graphTraversal";
import { Edge, Traverser, Values, Vertex } from "../../types";
import { FilterStep } from "./generic";

/**
 * Filter the traverser if its element doesn't have all the specified properties.
 * https://tinkerpop.apache.org/docs/current/reference/#has-step
 */
export class HasKeyStep extends FilterStep<Edge | Vertex | Values> {
  constructor(traversal: GraphTraversal<unknown, Edge | Vertex | Values>, keys: Array<string>) {
    super("hasKey", traversal, (traverser: Traverser<Edge | Vertex | Values>): boolean => {
      const value: Values =
        traverser.value instanceof Vertex || traverser.value instanceof Edge
          ? traverser.value.properties
          : traverser.value;

      let keep = true;
      keys.forEach((key) => {
        if (!(key in value)) {
          keep = false;
        }
      });

      return keep;
    });
  }
}
