import { omit } from "lodash";
import { NodeKey } from "graphology-types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser, Vertex } from "../../type";
import { MapStep } from "../map/generic";

/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
export class VStep extends MapStep<NodeKey, Vertex> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, Vertex>) {
    super(
      "V",
      traversal,
      (traverser: Traverser<NodeKey>): Vertex => {
        const id = traverser.value;
        const props = traversal.getGraph().getNodeAttributes(id);
        return new Vertex(
          id,
          props[traversal.getConfig().vertex_label_field] || [],
          omit(props, [traversal.getConfig().vertex_label_field]),
        );
      },
    );
  }
}
