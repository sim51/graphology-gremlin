"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasLabelStep = void 0;
const type_1 = require("../../type");
const generic_1 = require("./generic");
class HasLabelStep extends generic_1.FilterStep {
    constructor(traversal, labels) {
        super("hasLabel", traversal, (traverser) => {
            if (traverser.value instanceof type_1.Vertex) {
                return traverser.value.labels.some(label => labels.includes(label));
            }
            if (traverser.value instanceof type_1.Edge) {
                return labels.includes(traverser.value.type);
            }
            return false;
        });
    }
}
exports.HasLabelStep = HasLabelStep;
//# sourceMappingURL=hasLabel.js.map