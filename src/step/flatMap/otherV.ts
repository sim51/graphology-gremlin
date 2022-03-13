import { omit } from "lodash";
import { Vertex, Traverser } from "../../types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FlatMapStep } from "./generic";

/**
 * Move to the vertex that was not the vertex that was moved from.
 * @see https://tinkerpop.apache.org/docs/current/reference/#vertex-steps
 * TODO: need check for its definition / implementation
 */
export class OtherVStep extends FlatMapStep<Vertex, Vertex> {
  constructor(traversal: GraphTraversal<unknown, Vertex>) {
    super(
      "otherV",
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
          .filter((node: Vertex) => node.id !== source.id)
          [Symbol.iterator]();
      },
    );
  }
}
