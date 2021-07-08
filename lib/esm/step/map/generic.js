"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapStep = void 0;
const generic_1 = require("../generic");
class MapStep extends generic_1.Step {
    constructor(label, traversal, fn) {
        super(traversal);
        this.label = label;
        this.fn = fn;
    }
    getLabel() {
        return `${this.label}Map`;
    }
    next() {
        if (this.start === null)
            return { done: true, value: null };
        const ir = this.start.next();
        if (ir.done)
            return ir;
        else {
            const traverser = ir.value;
            return {
                done: ir.done,
                value: traverser.makeNextTraverser(this.getLabel(), this.fn(traverser)),
            };
        }
    }
}
exports.MapStep = MapStep;
//# sourceMappingURL=generic.js.map