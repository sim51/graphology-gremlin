"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertex = void 0;
// Lazy ?
// Give the graph internally + some config for node labels ?
// What to do for creation ?
class Vertex {
    constructor(id, labels = [], properties = {}) {
        this.id = id;
        this.labels = labels;
        this.properties = properties;
    }
}
exports.Vertex = Vertex;
//# sourceMappingURL=vertex.js.map