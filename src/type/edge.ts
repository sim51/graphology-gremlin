import { EdgeKey } from "graphology-types";

// Lazy ?
// Give the graph internally + some config for the edge type ?
// What to do for creation ?
export class Edge {
  id: EdgeKey;
  type: string;
  properties: { [key: string]: unknown };

  constructor(id: EdgeKey, type = "", properties: { [key: string]: unknown } = {}) {
    this.id = id;
    this.type = type;
    this.properties = properties;
  }
}
