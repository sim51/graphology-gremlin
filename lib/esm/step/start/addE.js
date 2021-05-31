"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEStep = void 0;
const type_1 = require("../../type");
const generic_1 = require("../map/generic");
class AddEStep extends generic_1.MapStep {
    /**
     * Default constructor.
     */
    constructor(traversal) {
        super("AddE", traversal, () => {
            return new type_1.Edge();
        });
    }
}
exports.AddEStep = AddEStep;
//# sourceMappingURL=addE.js.map