"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphTraversalSource = void 0;
const type_1 = require("../type");
const graphTraversal_1 = require("./graphTraversal");
const addE_1 = require("../step/graph/addE");
const addV_1 = require("../step/graph/addV");
const E_1 = require("../step/graph/E");
const V_1 = require("../step/graph/V");
class GraphTraversalSource {
    constructor(graph) {
        this.config = type_1.DEFAULT_GRAPH_CONFIGURATION;
        this.graph = graph;
    }
    with(key, value) {
        this.config[key] = value;
        return this;
    }
    V(...ids) {
        const nodes = (ids.length > 0 ? ids : this.graph.nodes()).map((id) => new type_1.Traverser(id));
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config, nodes[Symbol.iterator]());
        return gt.addStep(new V_1.VStep(gt));
    }
    addV() {
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config, this.emptyIterator());
        return gt.addStep(new addV_1.AddVStep(gt));
    }
    E(...ids) {
        const edges = (ids.length > 0 ? ids : this.graph.edges()).map((id) => new type_1.Traverser(id));
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config, edges[Symbol.iterator]());
        return gt.addStep(new E_1.EStep(gt));
    }
    addE() {
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config, this.emptyIterator());
        return gt.addStep(new addE_1.AddEStep(gt));
    }
    emptyIterator() {
        return [new type_1.Traverser(null)][Symbol.iterator]();
    }
}
exports.GraphTraversalSource = GraphTraversalSource;
//# sourceMappingURL=graphTraversalSource.js.map