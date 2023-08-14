import Graph from "graphology";

import { Values } from "./common";

export interface GraphConfiguration {
  vertex_label_field: string;
  edge_label_field: string;
}

//TODO add a method to create a node id.
export const DEFAULT_GRAPH_CONFIGURATION: GraphConfiguration = {
  vertex_label_field: "@labels",
  edge_label_field: "@type",
};

export type BaseGraph = Graph<{ id: string } & Values, { id: string } & Values, GraphConfiguration>;
