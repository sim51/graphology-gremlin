"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStep = void 0;
const generic_1 = require("../generic");
/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
class FilterStep extends generic_1.Step {
    /**
     * Default constructor.
     */
    constructor(label, traversal, fn) {
        super(traversal);
        this.label = label;
        this.fn = fn;
    }
    getLabel() {
        return this.label;
    }
    next() {
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