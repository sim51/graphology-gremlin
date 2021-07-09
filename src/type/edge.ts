import { EdgeKey } from "graphology-types";
import { Values } from "./common";
// Lazy ?
// Give the graph internally + some config for the edge type ?
// What to do for creation ?
export class Edge {
  id: EdgeKey;
  type: string;
  properties: Values;

  constructor(id: EdgeKey, type = "", properties: Values = {}) {
    this.id = id;
    this.type = type;
    this.properties = properties;
  }
}
