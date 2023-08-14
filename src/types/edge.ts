import { pick } from "lodash";
import Graph from "graphology";

import { Values } from "./common";
import { Vertex, VertexMap } from "./vertex";

export type EdgeMap = {
  id: string;
  label: string;
  IN: Pick<VertexMap, "id" | "label">;
  OUT: Pick<VertexMap, "id" | "label">;
} & Values;

export class Edge {
  id: string;
  type: string;
  properties: Values;

  constructor(id: string, type = "", properties: Values = {}) {
    this.id = id;
    this.type = type;
    this.properties = properties;
  }

  toMap(graph: Graph, properties: Array<string> = []): EdgeMap {
    if (!graph.hasEdge(this.id)) throw new Error("Not found");
    const labelProperty = graph.getAttribute("vertex_label_field");

    // TODO: find a better way for that, specially for the graph config
    const sourceId = graph.source(this.id);
    const source = new Vertex(sourceId, graph.getNodeAttribute(sourceId, labelProperty));
    const targetId = graph.target(this.id);
    const target = new Vertex(targetId, graph.getNodeAttribute(targetId, labelProperty));
    console.log(graph.getNodeAttributes(sourceId), graph.getNodeAttributes(targetId));

    const edge = {
      id: this.id,
      label: this.type,
      IN: target.toMap(graph),
      OUT: source.toMap(graph),
    };
    if (properties.length > 0) return { ...pick(this.properties, properties), ...edge };
    return { ...this.properties, ...edge };
  }

  toString(): string {
    return `e[${this.id}]`;
  }
}
