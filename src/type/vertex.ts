import { NodeKey } from "graphology-types";
import { Object } from "./common";

// Lazy ?
// Give the graph internally + some config for node labels ?
// What to do for creation ?
export class Vertex {
  id: NodeKey;
  labels: Array<string>;
  properties: Object;

  constructor(id: NodeKey, labels: Array<string> = [], properties: Object = {}) {
    this.id = id;
    this.labels = labels;
    this.properties = properties;
  }
}
