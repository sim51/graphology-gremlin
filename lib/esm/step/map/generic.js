"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapStep = void 0;
const generic_1 = require("../generic");
/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
class MapStep extends generic_1.Step {
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
        const ir = this.start.next();
        if (ir.done)
            return ir;
        else {
            // execute the step with the map function
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