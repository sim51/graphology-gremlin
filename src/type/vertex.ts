import { NodeKey } from "graphology-types";
import { Values } from "./common";

// Lazy ?
// Give the graph internally + some config for node labels ?
// What to do for creation ?
export class Vertex {
  id: NodeKey;
  labels: Array<string>;
  properties: Values;

  constructor(id: NodeKey, labels: Array<string> = [], properties: Values = {}) {
    this.id = id;
    this.labels = labels;
    this.properties = properties;
  }
}
