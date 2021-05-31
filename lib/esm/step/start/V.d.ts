import { NodeKey } from "graphology-types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { Vertex } from "../../type";
import { MapStep } from "../map/generic";
/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
export declare class VStep extends MapStep<NodeKey, Vertex> {
    /**
     * Default constructor.
     */
    constructor(traversal: GraphTraversal<any, any>);
}
