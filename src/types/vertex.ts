import { pick } from "lodash";
import Graph from "graphology";

import { Values } from "./common";

export type VertexMap = { id: string; label: Array<string> } & Values;

export class Vertex {
  id: string;
  labels: Array<string>;
  properties: Values;

  constructor(id: string, labels: Array<string> = [], properties: Values = {}) {
    this.id = id;
    this.labels = labels;
    this.properties = properties;
  }

  toMap(_graph: Graph, properties: Array<string> = []): VertexMap {
    const vertex = {
      id: this.id,
      label: this.labels,
    };
    if (properties.length > 0) return { ...pick(this.properties, properties), ...vertex };
    return { ...this.properties, ...vertex };
  }

  toString(): string {
    return `v[${this.id}]`;
  }
}
