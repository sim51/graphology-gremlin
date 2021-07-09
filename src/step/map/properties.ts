import { pick } from "lodash";
import { Edge, Vertex, Values, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * Return the properties of the traversal value.
 */
export class PropertiesStep extends MapStep<Edge | Vertex | Values, Values> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, Values>, properties: Array<string>) {
    super(
      "properties",
      traversal,
      (traverser: Traverser<Edge | Vertex | Values>): Values => {
        const value: Values =
          traverser.value instanceof Vertex || traverser.value instanceof Edge
            ? traverser.value.properties
            : traverser.value;
        return properties.length > 0 ? pick(value, properties) : value;
      },
    );
  }
}
