import { pick } from "lodash";

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

  toMap(properties: Array<string> = []): VertexMap {
    if (properties.length > 0) return { ...pick(this.properties, properties), id: this.id, label: this.labels };
    else return { ...this.properties, id: this.id, label: this.labels };
  }

  toString(): string {
    return `${this.id}`;
  }
}
