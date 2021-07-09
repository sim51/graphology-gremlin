import { Vertex, Edge, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";

/**
 * Filter the traverser if its element doesn't have one of the specified labels.
 */
export class HasLabelStep extends FilterStep<Vertex | Edge> {
  constructor(traversal: GraphTraversal<unknown, Vertex | Edge>, labels: Array<string>) {
    super("hasLabel", traversal, (traverser: Traverser<Vertex | Edge>): boolean => {
      if (traverser.value instanceof Vertex) {
        return traverser.value.labels.some(label => labels.includes(label));
      }
      if (traverser.value instanceof Edge) {
        return labels.includes(traverser.value.type);
      }
      return false;
    });
  }
}
