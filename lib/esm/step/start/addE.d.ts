import { GraphTraversal } from "../../traversal/graphTraversal";
import { Edge } from "../../type";
import { MapStep } from "../map/generic";
export declare class AddEStep extends MapStep<null, Edge> {
    /**
     * Default constructor.
     */
    constructor(traversal: GraphTraversal<any, any>);
}
