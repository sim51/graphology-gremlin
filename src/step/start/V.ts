import { omit } from "lodash";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser, Vertex } from "../../types";
import { MapStep } from "../map/generic";

/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
export class VStep extends MapStep<string, Vertex> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, Vertex>) {
    super(
      "V",
      traversal,
      (traverser: Traverser<string>): Vertex => {
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
