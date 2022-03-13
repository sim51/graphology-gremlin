import { Edge, EdgeMap, Vertex, VertexMap, Traverser } from "../../types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { MapStep } from "./generic";

/**
 * Return the properties of the traversal value as a js object (ie a map).
 * @see //https://tinkerpop.apache.org/docs/current/reference/#valuemap-step
 */
export class ElementMapStep extends MapStep<Edge | Vertex, EdgeMap | VertexMap> {
  constructor(traversal: GraphTraversal<unknown, EdgeMap | VertexMap>, properties: Array<string>) {
    super("elementMap", traversal, (traverser: Traverser<Edge | Vertex>): EdgeMap | VertexMap => {
      return traverser.value.toMap(properties);
    });
  }
}
