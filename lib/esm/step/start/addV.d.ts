import { GraphTraversal } from "../../traversal/graphTraversal";
import { Vertex } from "../../type";
import { MapStep } from "../map/generic";
export declare class AddVStep extends MapStep<null, Vertex> {
    /**
     * Default constructor.
     */
    constructor(traversal: GraphTraversal<any, any>);
}
