import { omit } from "lodash";
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
  constructor(traversal: GraphTraversal<unknown, Edge>) {
    super(
      "E",
      traversal,
      (traverser: Traverser<EdgeKey>): Edge => {
        const id = traverser.value;
        const props = traversal.getGraph().getEdgeAttributes(id);
        return new Edge(
          id,
          props[traversal.getConfig().edge_label_field],
          omit(props, [traversal.getConfig().edge_label_field]),
        );
      },
    );
  }
}
