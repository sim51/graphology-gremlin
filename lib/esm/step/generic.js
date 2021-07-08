"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
class Step {
    constructor(traversal) {
        this.start = null;
        this.traversal = traversal;
    }
    addStart(iterator) {
        this.start = iterator;
    }
}
exports.Step = Step;
//# sourceMappingURL=generic.js.map