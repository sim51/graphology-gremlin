"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStep = void 0;
const type_1 = require("../../type");
const generic_1 = require("../map/generic");
/**
 * Retrieve a list of edges or all graph edges.
 * Ex: g.E()
 */
class EStep extends generic_1.MapStep {
    /**
     * Default constructor.
     */
    constructor(traversal) {
        super("E", traversal, (traverser) => {
            return new type_1.Edge(traverser.value);
        });
    }
}
exports.EStep = EStep;
//# sourceMappingURL=E.js.map