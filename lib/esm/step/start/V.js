"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VStep = void 0;
const type_1 = require("../../type");
const generic_1 = require("../map/generic");
/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
class VStep extends generic_1.MapStep {
    /**
     * Default constructor.
     */
    constructor(traversal) {
        super("V", traversal, (traverser) => {
            const id = traverser.value;
            const props = traversal.getGraph().getNodeAttributes(id);
            return new type_1.Vertex(id, props[traversal.getConfig().vertex_label_field] || [], props);
        });
    }
}
exports.VStep = VStep;
//# sourceMappingURL=V.js.map