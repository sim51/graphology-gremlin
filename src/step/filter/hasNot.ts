import { Edge, Vertex, Object, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";

/**
 * Filter the traverser if its element has one of the specified properties.
 * https://tinkerpop.apache.org/docs/current/reference/#has-step
 */
export class HasNotStep extends FilterStep<Edge | Vertex | Object> {
  constructor(traversal: GraphTraversal<any, any>, keys: Array<string>) {
    super("hasNot", traversal, (traverser: Traverser<Edge | Vertex | Object>): boolean => {
      const value: Object =
        traverser.value instanceof Vertex || traverser.value instanceof Edge
          ? traverser.value.properties
          : traverser.value;

      let keep = true;
      keys.forEach(key => {
        if (key in value) {
          keep = false;
        }
      });

      return keep;
    });
  }
}
