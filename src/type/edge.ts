import { pick } from "lodash";
import { EdgeKey } from "graphology-types";
import { Values } from "./common";

export type EdgeMap = { id: EdgeKey; label: string } & Values;

export class Edge {
  id: EdgeKey;
  type: string;
  properties: Values;

  constructor(id: EdgeKey, type = "", properties: Values = {}) {
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
