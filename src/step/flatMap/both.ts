import { omit } from "lodash";

import { GraphTraversal } from "../../traversal/graphTraversal";
import { Edge, Traverser, Vertex } from "../../types";
import { FlatMapStep } from "./generic";

/**
 * Move to the outgoing adjacent vertices given the edge labels.
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 */
export class BothStep extends FlatMapStep<Vertex, Vertex> {
  constructor(traversal: GraphTraversal<unknown, Vertex>, labels: Array<string>) {
    super("both", traversal, (traverser: Traverser<Vertex>): Iterator<Vertex> => {
      const graph = traversal.getGraph();
      const config = traversal.getConfig();
      const source = traverser.value;
      return graph
        .edges(source.id)
        .map((id: string) => {
          const props = graph.getEdgeAttributes(id);
          return new Edge(id, props[config.edge_label_field] || "", props);
        })
        .filter((edge: Edge) => (labels.length > 0 ? labels.includes(edge.type) : true))
        .map((edge: Edge) => {
          const nodeKey = graph.opposite(source.id, edge.id);
          const props = graph.getNodeAttributes(nodeKey);
          return new Vertex(nodeKey, props[config.vertex_label_field] || [], omit(props, [config.vertex_label_field]));
        })
        [Symbol.iterator]();
    });
  }
}
