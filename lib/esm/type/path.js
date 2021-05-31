"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const vertex_1 = require("./vertex");
class Path {
    constructor(path) {
        this.segments = [];
        if (path instanceof vertex_1.Vertex) {
            this.source = path;
        }
        else {
            if (path.length === 0)
                throw new Error("Can't build a path with an empty array");
            this.segments = path;
            this.source = this.segments[0].source;
            this.target = this.segments[this.segments.length - 1].target;
        }
    }
}
exports.Path = Path;
//# sourceMappingURL=path.js.map