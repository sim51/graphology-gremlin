import { EdgeKey } from "graphology-types";
import { Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Move to the vertex that was not the vertex that was moved from.
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 * TODO: need check for its definition / implementation
 */
export class OtherVStep extends FlatMapStep<Vertex, Vertex> {
  constructor(traversal: GraphTraversal<any, any>) {
    super(
      "otherV",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Vertex> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;
        return graph
          .edges(source.id)
          .map((id: EdgeKey) => {
            const nodeKey = graph.opposite(source.id, id);
            const props = graph.getNodeAttributes(nodeKey);
            return new Vertex(nodeKey, props[config.vertex_label_field] || [], props);
          })
          .filter((node: Vertex) => node.id !== source.id)
          [Symbol.iterator]();
      },
    );
  }
}
