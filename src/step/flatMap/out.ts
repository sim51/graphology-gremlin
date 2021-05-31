import { NodeKey } from "graphology-types";
import { Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Retrieve a list of edges or all graph edges.
 * Ex: g.E()
 */
export class OutStep extends FlatMapStep<Vertex, Vertex> {
  /**
   * Default constructor.
   */
  constructor(traversal: GraphTraversal<any, any>, label?: string) {
    super(
      "outStep",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Vertex> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;

        return graph
          .outNeighbors(source.id)
          .map((id: NodeKey) => {
            const props = graph.getNodeAttributes(id);
            return new Vertex(id, props[config.vertex_label_field] || [], props);
          })
          .filter((vertex: Vertex) => (label ? vertex.labels.includes(label) : true))
          [Symbol.iterator]();
      },
    );
  }
}
