import { pick } from "lodash";
import { Edge, Vertex, Object, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * Return the properties of the traversal value.
 */
export class PropertiesStep extends MapStep<Edge | Vertex | Object, Object> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<any, any>, properties: Array<string>) {
    super(
      "properties",
      traversal,
      (traverser: Traverser<Edge | Vertex | Object>): Object => {
        const value: Object =
          traverser.value instanceof Vertex || traverser.value instanceof Edge
            ? traverser.value.properties
            : traverser.value;
        return properties.length > 0 ? pick(value, properties) : value;
      },
    );
  }
}
