import { GraphTraversal } from "../../traversal/graphTraversal";
import { Edge } from "../../types";
import { MapStep } from "../map/generic";

/**
 * Step for adding an Edge to the graph.
 * NOTE: If the previous step return a Vertex, put it as source & target.
 * Usage:
 *  - .addE() : Adds a Vertex with a default vertex label
 *  - .addE() : If the previous step returns a string, Adds a Vertex labeled with it
 *  - .addE("KNOWS") : Adds an Edge with the specified label
 */
export class AddEStep extends MapStep<null, Edge> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, Edge>) {
    super(
      "AddE",
      traversal,
      (): Edge => {
        // TODO: use an ID generator
        return new Edge(`${new Date().getTime()}`);
      },
    );
  }
}
