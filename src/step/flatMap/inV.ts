import { omit } from "lodash";
import { EdgeKey } from "graphology-types";
import { Vertex, Traverser } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Move to the incoming vertex.
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 */
export class InVStep extends FlatMapStep<Vertex, Vertex> {
  constructor(traversal: GraphTraversal<unknown, Vertex>) {
    super(
      "inV",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Vertex> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;
        return graph
          .inEdges(source.id)
          .map((id: EdgeKey) => {
            const nodeKey = graph.opposite(source.id, id);
            const props = graph.getNodeAttributes(nodeKey);
            return new Vertex(
              nodeKey,
              props[config.vertex_label_field] || [],
              omit(props, [config.vertex_label_field]),
            );
          })
          [Symbol.iterator]();
      },
    );
  }
}
