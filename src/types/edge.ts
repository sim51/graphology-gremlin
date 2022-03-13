import { pick } from "lodash";
import { Values } from "./common";

export type EdgeMap = { id: string; label: string } & Values;

export class Edge {
  id: string;
  type: string;
  properties: Values;

  constructor(id: string, type = "", properties: Values = {}) {
    this.id = id;
    this.type = type;
    this.properties = properties;
  }

  toMap(properties: Array<string> = []): EdgeMap {
    if (properties.length > 0) return { ...pick(this.properties, properties), id: this.id, label: this.type };
    else return { ...this.properties, id: this.id, label: this.type };
  }

  toString(): string {
    return `${this.id}`;
  }
}
