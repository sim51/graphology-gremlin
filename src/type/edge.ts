import { EdgeKey } from "graphology-types";

// Lazy ?
// Give the graph internally + some config for the edge type ?
// What to do for creation ?
export class Edge {
  id: EdgeKey | null = null;

  constructor(id?: EdgeKey) {
    if (id) this.id = id;
  }
}
