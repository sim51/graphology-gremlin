"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVStep = void 0;
const type_1 = require("../../type");
const generic_1 = require("../map/generic");
class AddVStep extends generic_1.MapStep {
    /**
     * Default constructor.
     */
    constructor(traversal) {
        super("AddV", traversal, () => {
            const node = traversal.getGraph().addNode(new Date().getTime());
            return new type_1.Vertex(node);
        });
    }
}
exports.AddVStep = AddVStep;
//# sourceMappingURL=addV.js.map