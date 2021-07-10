import { GraphTraversal } from "../../traversal/graphTraversal";
import { Vertex } from "../../type";
import { MapStep } from "../map/generic";

/**
 * Step for adding a Vertex to the graph.
 * Usage:
 *  - .addV() : Adds a Vertex with a default vertex label
 *  - .addV() : If the previous step returns a string, Adds a Vertex labeled with it
 *  - .addV("Person") : Adds a Vertex with the specified label
 */
export class AddVStep extends MapStep<string | null, Vertex> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<unknown, Vertex>) {
    super(
      "AddV",
      traversal,
      (): Vertex => {
        const node = traversal.getGraph().addNode(new Date().getTime());
        return new Vertex(node);
      },
    );
  }
}
