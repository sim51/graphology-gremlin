"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStep = void 0;
const generic_1 = require("../generic");
class FilterStep extends generic_1.Step {
    constructor(label, traversal, fn) {
        super(traversal);
        this.label = label;
        this.fn = fn;
    }
    getLabel() {
        return `${this.label}Filter`;
    }
    next() {
        if (this.start === null)
            return { done: true, value: null };
        let ir = this.start.next();
        let nextFound = false;
        while (!ir.done && !nextFound) {
            nextFound = this.fn(ir.value);
            if (!nextFound)
                ir = this.start.next();
        }
        return ir;
    }
}
exports.FilterStep = FilterStep;
//# sourceMappingURL=generic.js.map