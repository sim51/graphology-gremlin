import { Vertex, Edge } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";
export declare class HasLabelStep extends FilterStep<Vertex | Edge> {
    constructor(traversal: GraphTraversal<any, any>, labels: Array<string>);
}
