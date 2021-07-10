import { pick, toPairsIn } from "lodash";
import { Edge, Vertex, Values, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Return the properties (ie a paris) of the traversal value.
 * @see https://tinkerpop.apache.org/docs/current/reference/#properties-step
 */
export class PropertiesStep extends FlatMapStep<Edge | Vertex | Values, [string, unknown]> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, [string, unknown]>, properties: Array<string>) {
    super(
      "properties",
      traversal,
      (traverser: Traverser<Edge | Vertex | Values>): Iterator<[string, unknown]> => {
        const value: Values =
          traverser.value instanceof Vertex || traverser.value instanceof Edge
            ? traverser.value.properties
            : traverser.value;

        const filteredValue = properties.length > 0 ? pick(value, properties) : value;
        return toPairsIn(filteredValue)[Symbol.iterator]();
      },
    );
  }
}
