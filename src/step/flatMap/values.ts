import { pick, valuesIn } from "lodash";

import { GraphTraversal } from "../../traversal/graphTraversal";
import { Edge, Traverser, Values, Vertex } from "../../types";
import { FlatMapStep } from "./generic";

/**
 * Return the values of the traversal value.
 * @see https://tinkerpop.apache.org/docs/current/reference/#values-step
 */
export class ValuesStep extends FlatMapStep<Edge | Vertex | Values, unknown> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, unknown>, properties: Array<string>) {
    super("values", traversal, (traverser: Traverser<Edge | Vertex | Values>): Iterator<unknown> => {
      const value: Values =
        traverser.value instanceof Vertex || traverser.value instanceof Edge
          ? traverser.value.properties
          : traverser.value;

      const filteredValue = properties.length > 0 ? pick(value, properties) : value;
      return valuesIn(filteredValue)[Symbol.iterator]();
    });
  }
}
