import Graph from "graphology";
import { NodeKey, EdgeKey } from "graphology-types";
import { Vertex, Edge, GraphConfiguration } from "../type";
import { GraphTraversal } from "./graphTraversal";
export declare class GraphTraversalSource {
    private graph;
    private config;
    constructor(graph: Graph);
    with(key: keyof GraphConfiguration, value: string): this;
    V(...ids: Array<NodeKey>): GraphTraversal<NodeKey, Vertex>;
    addV(): GraphTraversal<null | string, Vertex>;
    E(...ids: Array<EdgeKey>): GraphTraversal<EdgeKey, Edge>;
    addE(): GraphTraversal<null | string, Edge>;
    private emptyIterator;
}
