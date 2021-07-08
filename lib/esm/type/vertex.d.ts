import { NodeKey } from "graphology-types";
import { Object } from "./common";
export declare class Vertex {
    id: NodeKey;
    labels: Array<string>;
    properties: Object;
    constructor(id: NodeKey, labels?: Array<string>, properties?: Object);
}
