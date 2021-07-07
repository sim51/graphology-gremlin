import { NodeKey, EdgeKey } from "graphology-types";
import { Edge, Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Move to both the incoming and outgoing incident edges given the edge labels.
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 */
export class BothEStep extends FlatMapStep<Vertex, Edge> {
  constructor(traversal: GraphTraversal<any, any>, labels: Array<string>) {
    super(
      "bothE",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Edge> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;
        return graph
          .edges(source.id)
          .map((id: EdgeKey) => {
            const props = graph.getEdgeAttributes(id);
            return new Edge(id, props[config.edge_label_field] || "", props);
          })
          .filter((edge: Edge) => (labels.length > 0 ? labels.includes(edge.type) : true))
          [Symbol.iterator]();
      },
    );
  }
}
