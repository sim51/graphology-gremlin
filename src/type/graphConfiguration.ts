export interface GraphConfiguration {
  vertex_label_field: string;
  edge_label_field: string;
}

//TODO add a method to create a node id.
export const DEFAULT_GRAPH_CONFIGURATION: GraphConfiguration = {
  vertex_label_field: "@labels",
  edge_label_field: "@type",
};
