import { GraphTraversal } from "../../traversal/graphTraversal";
import { Vertex } from "../../type";
import { MapStep } from "../map/generic";

export class AddVStep extends MapStep<null, Vertex> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<any, any>) {
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
