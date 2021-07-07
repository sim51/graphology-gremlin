import { NodeKey, EdgeKey } from "graphology-types";
import { Edge, Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Move to the outgoing vertex.
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 */
export class OutVStep extends FlatMapStep<Vertex, Vertex> {
  constructor(traversal: GraphTraversal<any, any>) {
    super(
      "outV",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Vertex> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;
        return graph
          .outEdges(source.id)
          .map((id: EdgeKey) => {
            const nodeKey = graph.opposite(source.id, id);
            const props = graph.getNodeAttributes(nodeKey);
            return new Vertex(nodeKey, props[config.vertex_label_field] || [], props);
          })
          [Symbol.iterator]();
      },
    );
  }
}
