import { pick } from "lodash";
import { Edge, Vertex, Values, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * Return the properties of the traversal value as a js object (ie a map).
 * @see //https://tinkerpop.apache.org/docs/current/reference/#valuemap-step
 */
export class ValueMapStep extends MapStep<Edge | Vertex | Values, Values> {
  constructor(traversal: GraphTraversal<unknown, Values>, properties: Array<string>) {
    super(
      "valueMap",
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
