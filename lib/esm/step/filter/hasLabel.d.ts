import { Vertex } from "../../type";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";
/**
 * Retrieve a list of edges or all graph edges.
 * Ex: g.E()
 */
export declare class HasLabelStep extends FilterStep<Vertex> {
    /**
     * Default constructor.
     */
    constructor(traversal: GraphTraversal<any, any>, label: string);
}
