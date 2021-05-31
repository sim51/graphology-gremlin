"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphTraversal = void 0;
// filter step
const hasLabel_1 = require("../step/filter/hasLabel");
/**
 * Extract from https://github.com/apache/tinkerpop/blob/master/gremlin-core/src/main/java/org/apache/tinkerpop/gremlin/process/traversal/Traversal.java
 *
 * A {@link Traversal} represents a directed walk over a {@link Graph}.
 * This is the base interface for all traversal's, where each extending interface is seen as a domain specific language.
 * For example, {@link GraphTraversal} is a domain specific language for traversing a graph using "graph concepts" (e.g. vertices, edges).
 * Another example may represent the graph using "social concepts" (e.g. people, cities, artifacts).
 * A {@link Traversal} is evaluated in one of two ways: iterator-based OLTP or {@link GraphComputer}-based OLAP.
 * OLTP traversals leverage an iterator and are executed within a single JVM (with data access allowed to be remote).
 * OLAP traversals leverage {@link GraphComputer} and are executed between multiple JVMs (and/or cores).
 *
 * @author Marko A. Rodriguez (http://markorodriguez.com)
 */
class GraphTraversal {
    constructor(graph, config) {
        this.steps = [];
        this.target = null;
        this.graph = graph;
        this.config = config;
    }
    /**
     * Consume the iterator result.
     */
    next() {
        return this.getTarget().next();
    }
    /**
     * Add a step to the traversal.
     */
    addStep(step) {
        this.steps.push(step);
        return this;
    }
    /**
     * Add a start to the traversal.
     */
    addStart(start) {
        this.start = start;
        return this;
    }
    getGraph() {
        return this.graph;
    }
    getConfig() {
        return this.config;
    }
    /**
     * Return the target iterator of the traversal.
     * The target iterator is created if it's not the case.
     * So this function in fact execute the traversal.
     */
    getTarget() {
        if (this.target === null) {
            let target = this.start;
            this.steps.forEach((step) => {
                step.addStart(target);
                target = step;
            });
            this.target = target;
        }
        return this.target;
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~ Filter steps
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    hasLabel(label) {
        this.addStep(new hasLabel_1.HasLabelStep(this, label));
        return this;
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~ Terminal steps
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * Give the traversal result as a list.
     */
    toList() {
        const result = [];
        let ir = this.next();
        while (!ir.done) {
            result.push(ir.value);
            ir = this.next();
        }
        return result;
    }
    /**
     * Give the traversal result as a Set.
     * TODO: need to remove duplicates by checking there footprint ???
     */
    toSet() {
        const result = new Set();
        let ir = this.next();
        while (!ir.done) {
            result.add(ir.value);
            ir = this.next();
        }
        return result;
    }
    /**
     * Give the explain of the traversal.
     */
    explain() {
        throw new Error("Not implemented");
    }
}
exports.GraphTraversal = GraphTraversal;
//# sourceMappingURL=graphTraversal.js.map