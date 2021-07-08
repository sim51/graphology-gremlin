"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traverser = void 0;
class Traverser {
    constructor(value, path) {
        this.path = [];
        this.value = value;
        if (path)
            this.path = path;
    }
    get() {
        return this.value;
    }
    getPath() {
        return this.path;
    }
    makeNextTraverser(label, value) {
        const copyPath = this.path.slice();
        copyPath.push({ label, value });
        return new Traverser(value, copyPath);
    }
}
exports.Traverser = Traverser;
//# sourceMappingURL=traverser.js.map