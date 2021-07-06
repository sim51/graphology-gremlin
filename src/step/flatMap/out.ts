import { NodeKey, EdgeKey } from "graphology-types";
import { Edge, Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 */
export class OutStep extends FlatMapStep<Vertex, Vertex> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<any, any>, labels: Array<string>) {
    super(
      "outStep",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Vertex> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;
        return graph
          .outEdges(source.id)
          .map((id: EdgeKey) => {
            const props = graph.getEdgeAttributes(id);
            return new Edge(id, props[config.edge_label_field] || "", props);
          })
          .filter((edge: Edge) => (labels.length > 0 ? labels.includes(edge.type) : true))
          .map((edge: Edge) => {
            const nodeKey = graph.opposite(source.id, edge.id);
            const props = graph.getNodeAttributes(nodeKey);
            return new Vertex(nodeKey, props[config.vertex_label_field] || [], props);
          })
          [Symbol.iterator]();
      },
    );
  }
}
