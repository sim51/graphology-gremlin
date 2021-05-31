"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasLabelStep = void 0;
const generic_1 = require("./generic");
/**
 * Retrieve a list of edges or all graph edges.
 * Ex: g.E()
 */
class HasLabelStep extends generic_1.FilterStep {
    /**
     * Default constructor.
     */
    constructor(traversal, label) {
        super("hasLabel", traversal, (traverser) => {
            return traverser.value.labels.includes(label);
        });
    }
}
exports.HasLabelStep = HasLabelStep;
//# sourceMappingURL=hasLabel.js.map