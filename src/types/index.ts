import { Values, Order } from "./common";
import { Edge, EdgeMap } from "./edge";
import { Vertex, VertexMap } from "./vertex";
import { Path, PathSegment } from "./path";
import { Traverser } from "./traverser";
import { BaseGraph, DEFAULT_GRAPH_CONFIGURATION, GraphConfiguration } from "./graph";

export class NotImplemented extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export {
  Edge,
  EdgeMap,
  Vertex,
  VertexMap,
  Values,
  Order,
  Path,
  PathSegment,
  Traverser,
  BaseGraph,
  GraphConfiguration,
  DEFAULT_GRAPH_CONFIGURATION,
};
