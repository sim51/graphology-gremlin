import { EdgeKey } from "graphology-types";
import { Object } from "./common";
export declare class Edge {
    id: EdgeKey;
    type: string;
    properties: Object;
    constructor(id: EdgeKey, type?: string, properties?: Object);
}
