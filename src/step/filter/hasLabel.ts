import { Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";

/**
 * Retrieve a list of edges or all graph edges.
 * Ex: g.E()
 */
export class HasLabelStep extends FilterStep<Vertex> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<any, any>, label: string) {
    super("hasLabel", traversal, (traverser: Traverser<Vertex>): boolean => {
      return traverser.value.labels.includes(label);
    });
  }
}
