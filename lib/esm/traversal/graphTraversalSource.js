"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphTraversalSource = void 0;
const type_1 = require("../type");
const graphTraversal_1 = require("./graphTraversal");
// start steps
const addE_1 = require("../step/start/addE");
const addV_1 = require("../step/start/addV");
const E_1 = require("../step/start/E");
const V_1 = require("../step/start/V");
/**
 * Extract of https://github.com/apache/tinkerpop/blob/master/gremlin-core/src/main/java/org/apache/tinkerpop/gremlin/process/traversal/TraversalSource.java
 *
 * A {@code TraversalSource} is used to create {@link Traversal} instances.
 * A traversal source can generate any number of {@link Traversal} instances.
 * A traversal source is primarily composed of a {@link Graph} and a {@link TraversalStrategies}.
 * Various {@code withXXX}-based methods are used to configure the traversal strategies (called "configurations").
 * Various other methods (dependent on the traversal source type) will then generate a traversal given the graph and configured strategies (called "spawns").
 * A traversal source is immutable in that fluent chaining of configurations create new traversal sources.
 * This is unlike {@link Traversal} and {@link GraphComputer}, where chained methods configure the same instance.
 * Every traversal source implementation must maintain two constructors to enable proper reflection-based construction.
 * <p/>
 * {@code TraversalSource(Graph)} and {@code TraversalSource(Graph,TraversalStrategies)}
 *
 * @author Marko A. Rodriguez (http://markorodriguez.com)
 * @author Stephen Mallette (http://stephen.genoprime.com)
 */
class GraphTraversalSource {
    constructor(graph) {
        this.config = type_1.DEFAULT_GRAPH_CONFIGURATION;
        this.graph = graph;
    }
    with(key, value) {
        this.config[key] = value;
        return this;
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~ Start steps
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Those steps are executed directly and result are passed to the traversal
    // constructor for its start
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * List all vertex of the graph or a selection.
     */
    V(...ids) {
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config);
        gt.addStep(new V_1.VStep(gt));
        const nodes = (ids.length > 0 ? ids : this.graph.nodes()).map((id) => new type_1.Traverser(id));
        gt.addStart(nodes[Symbol.iterator]());
        return gt;
    }
    /**
     * Create a new vertex.
     */
    addV() {
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config);
        gt.addStep(new addV_1.AddVStep(gt));
        const iteratorArray = [null];
        gt.addStart(iteratorArray[Symbol.iterator]());
        return gt;
    }
    /**
     * List all edges of the graph or a selection.
     */
    E(...ids) {
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config);
        gt.addStep(new E_1.EStep(gt));
        const edges = (ids.length > 0 ? ids : this.graph.edges()).map((id) => new type_1.Traverser(id));
        gt.addStart(edges[Symbol.iterator]());
        return gt;
    }
    /**
     * Create a new edge.
     */
    addE() {
        const gt = new graphTraversal_1.GraphTraversal(this.graph, this.config);
        gt.addStep(new addE_1.AddEStep(gt));
        const iteratorArray = [null];
        gt.addStart(iteratorArray[Symbol.iterator]());
        return gt;
    }
    inject() {
        throw new Error("Not implemented");
    }
}
exports.GraphTraversalSource = GraphTraversalSource;
//# sourceMappingURL=graphTraversalSource.js.map