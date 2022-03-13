import { omit } from "lodash";
import { Vertex, Traverser } from "../../types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Move to both vertices..
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 */
export class BothVStep extends FlatMapStep<Vertex, Vertex> {
  constructor(traversal: GraphTraversal<unknown, Vertex>) {
    super(
      "bothV",
      traversal,
      (traverser: Traverser<Vertex>): Iterator<Vertex> => {
        const graph = traversal.getGraph();
        const config = traversal.getConfig();
        const source = traverser.value;
        return graph
          .edges(source.id)
          .map((id: string) => {
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
