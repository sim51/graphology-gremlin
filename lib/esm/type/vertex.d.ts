import { NodeKey } from "graphology-types";
export declare class Vertex {
    id: NodeKey;
    labels: Array<string>;
    properties: {
        [key: string]: unknown;
    };
    constructor(id: NodeKey, labels?: Array<string>, properties?: {
        [key: string]: unknown;
    });
}
