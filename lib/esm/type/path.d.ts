import { Vertex } from "./vertex";
import { Edge } from "./edge";
export interface PathSegment {
    source: Vertex;
    edge: Edge;
    target: Vertex;
}
export declare class Path {
    source: Vertex;
    target: Vertex | null;
    segments: Array<PathSegment>;
    constructor(path: Array<PathSegment> | Vertex);
}
