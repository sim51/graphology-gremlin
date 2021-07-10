import { omit } from "lodash";
import { EdgeKey } from "graphology-types";
import { Edge, Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Move to the incoming incident edges given the edge labels.
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 */
export class OutEStep extends FlatMapStep<Vertex, Edge> {
  constructor(traversal: GraphTraversal<unknown, Edge>, labels: Array<string>) {
    super(
      "outE",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Edge> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;
        return graph
          .outEdges(source.id)
          .map((id: EdgeKey) => {
            const props = graph.getEdgeAttributes(id);
            return new Edge(id, props[config.edge_label_field] || "", omit(props, [config.edge_label_field]));
          })
          .filter((edge: Edge) => (labels.length > 0 ? labels.includes(edge.type) : true))
          [Symbol.iterator]();
      },
    );
  }
}
