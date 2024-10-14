import { GraphTraversal } from "../../traversal/graphTraversal";
import { Edge, Traverser, Vertex } from "../../types";
import { FlatMapStep } from "./generic";

/**
 * Return the labels of the graph element
 * @see https://tinkerpop.apache.org/docs/current/reference/#label-step
 */
export class LabelStep extends FlatMapStep<Edge | Vertex, string> {
  constructor(traversal: GraphTraversal<unknown, string>) {
    super("label", traversal, (traverser: Traverser<Edge | Vertex>): Iterator<string> => {
      const labels: Array<string> = traverser.value instanceof Vertex ? traverser.value.labels : [traverser.value.type];
      return labels[Symbol.iterator]();
    });
  }
}
