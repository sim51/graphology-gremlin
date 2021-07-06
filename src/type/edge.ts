import { EdgeKey } from "graphology-types";
import { Object } from "./common";
// Lazy ?
// Give the graph internally + some config for the edge type ?
// What to do for creation ?
export class Edge {
  id: EdgeKey;
  type: string;
  properties: Object;

  constructor(id: EdgeKey, type = "", properties: Object = {}) {
    this.id = id;
    this.type = type;
    this.properties = properties;
  }
}
