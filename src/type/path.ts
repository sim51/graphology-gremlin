import { Vertex } from "./vertex";
import { Edge } from "./edge";

export interface PathSegment {
  source: Vertex;
  edge: Edge;
  target: Vertex;
}

export class Path {
  source: Vertex;
  target: Vertex | null;
  segments: Array<PathSegment> = [];

  constructor(path: Array<PathSegment> | Vertex) {
    if (path instanceof Vertex) {
      this.source = path;
    } else {
      if (path.length === 0) throw new Error("Can't build a path with an empty array");
      this.segments = path;
      this.source = this.segments[0].source;
      this.target = this.segments[this.segments.length - 1].target;
    }
  }
}
