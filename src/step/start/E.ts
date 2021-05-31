import { EdgeKey } from "graphology-types";
import { Edge, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "../map/generic";

/**
 * Retrieve a list of edges or all graph edges.
 * Ex: g.E()
 */
export class EStep extends MapStep<EdgeKey, Edge> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<any, any>) {
    super(
      "E",
      traversal,
      (traverser: Traverser<EdgeKey>): Edge => {
        return new Edge(traverser.value);
      },
    );
  }
}
