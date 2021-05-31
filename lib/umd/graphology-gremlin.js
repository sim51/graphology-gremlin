(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["graphology-gremlin"] = factory();
	else
		root["graphology-gremlin"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphTraversalSource = void 0;
const type_1 = __webpack_require__(2);
const graphTraversal_1 = __webpack_require__(8);
// start steps
const addE_1 = __webpack_require__(12);
const addV_1 = __webpack_require__(14);
const E_1 = __webpack_require__(15);
const V_1 = __webpack_require__(16);
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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_GRAPH_CONFIGURATION = exports.Traverser = exports.Path = exports.Vertex = exports.Edge = void 0;
const edge_1 = __webpack_require__(3);
Object.defineProperty(exports, "Edge", ({ enumerable: true, get: function () { return edge_1.Edge; } }));
const vertex_1 = __webpack_require__(4);
Object.defineProperty(exports, "Vertex", ({ enumerable: true, get: function () { return vertex_1.Vertex; } }));
const path_1 = __webpack_require__(5);
Object.defineProperty(exports, "Path", ({ enumerable: true, get: function () { return path_1.Path; } }));
const traverser_1 = __webpack_require__(6);
Object.defineProperty(exports, "Traverser", ({ enumerable: true, get: function () { return traverser_1.Traverser; } }));
const graphConfiguration_1 = __webpack_require__(7);
Object.defineProperty(exports, "DEFAULT_GRAPH_CONFIGURATION", ({ enumerable: true, get: function () { return graphConfiguration_1.DEFAULT_GRAPH_CONFIGURATION; } }));


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Edge = void 0;
// Lazy ?
// Give the graph internally + some config for the edge type ?
// What to do for creation ?
class Edge {
    constructor(id) {
        this.id = null;
        if (id)
            this.id = id;
    }
}
exports.Edge = Edge;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vertex = void 0;
// Lazy ?
// Give the graph internally + some config for node labels ?
// What to do for creation ?
class Vertex {
    constructor(id, labels = [], properties = {}) {
        this.id = id;
        this.labels = labels;
        this.properties = properties;
    }
}
exports.Vertex = Vertex;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Path = void 0;
const vertex_1 = __webpack_require__(4);
class Path {
    constructor(path) {
        this.segments = [];
        if (path instanceof vertex_1.Vertex) {
            this.source = path;
        }
        else {
            if (path.length === 0)
                throw new Error("Can't build a path with an empty array");
            this.segments = path;
            this.source = this.segments[0].source;
            this.target = this.segments[this.segments.length - 1].target;
        }
    }
}
exports.Path = Path;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Traverser = void 0;
/**
 * Extract of https://github.com/apache/tinkerpop/blob/master/gremlin-core/src/main/java/org/apache/tinkerpop/gremlin/process/traversal/Traverser.java
 *
 * A {@code Traverser} represents the current state of an object flowing through a {@link Traversal}.
 * A traverser maintains a reference to the current object, a traverser-local "sack", a traversal-global sideEffect,
 * a bulk count, and a path history.
 * <p/>
 * Different types of traversers can exist depending on the semantics of the traversal and the desire for
 * space/time optimizations of the developer.
 */
class Traverser {
    /**
     * Default constructor.
     */
    constructor(value, path) {
        this.value = value;
        if (path)
            this.path = path;
    }
    /**
     * Return the value of the traverser.
     */
    get() {
        return this.value;
    }
    /**
     * Return the path of the traverser.
     */
    getPath() {
        return this.path;
    }
    /**
     * Create a new traverser for the next iteration.
     */
    makeNextTraverser(label, value) {
        const copyPath = [].concat(this.path);
        copyPath.push({ label, value });
        return new Traverser(value, copyPath);
    }
}
exports.Traverser = Traverser;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_GRAPH_CONFIGURATION = void 0;
//TODO add a method to create a node id.
exports.DEFAULT_GRAPH_CONFIGURATION = {
    vertex_label_field: "@labels",
    edge_label_field: "@type",
};


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphTraversal = void 0;
// filter step
const hasLabel_1 = __webpack_require__(9);
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


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HasLabelStep = void 0;
const generic_1 = __webpack_require__(10);
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


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterStep = void 0;
const generic_1 = __webpack_require__(11);
/**
 * Retrieve a list of vertex or all graph vertex.
 * Ex: g.V()
 */
class FilterStep extends generic_1.Step {
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
        let ir = this.start.next();
        let nextFound = false;
        while (!ir.done && !nextFound) {
            nextFound = this.fn(ir.value);
            if (!nextFound)
                ir = this.start.next();
        }
        return ir;
    }
}
exports.FilterStep = FilterStep;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Step = void 0;
/**
 * Extract of https://github.com/apache/tinkerpop/blob/master/gremlin-core/src/main/java/org/apache/tinkerpop/gremlin/process/traversal/Step.java
 *
 * A {@link Step} denotes a unit of computation within a {@link Traversal}.
 * A step takes an incoming object and yields an outgoing object.
 * Steps are chained together in a {@link Traversal} to yield a lazy function chain of computation.
 * <p/>
 * In the constructor of a Step, never store explicit sideEffect objects in {@link TraversalSideEffects}.
 * If a sideEffect needs to be registered with the {@link Traversal}, use SideEffects.registerSupplier().
 *
 * @param <S> The incoming object type of the step
 * @param <E> The outgoing object type of the step
 */
class Step {
    /**
     * Default constructor.
     */
    constructor(traversal) {
        /**
         * The starts object for the step.
         */
        this.start = null;
        this.traversal = traversal;
    }
    /**
     *  Add the starts item for the step.
     */
    addStart(iterator) {
        this.start = iterator;
    }
}
exports.Step = Step;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddEStep = void 0;
const type_1 = __webpack_require__(2);
const generic_1 = __webpack_require__(13);
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


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MapStep = void 0;
const generic_1 = __webpack_require__(11);
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


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddVStep = void 0;
const type_1 = __webpack_require__(2);
const generic_1 = __webpack_require__(13);
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


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EStep = void 0;
const type_1 = __webpack_require__(2);
const generic_1 = __webpack_require__(13);
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


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VStep = void 0;
const type_1 = __webpack_require__(2);
const generic_1 = __webpack_require__(13);
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


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphTraversalSource = void 0;
const graphTraversalSource_1 = __webpack_require__(1);
Object.defineProperty(exports, "GraphTraversalSource", ({ enumerable: true, get: function () { return graphTraversalSource_1.GraphTraversalSource; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=graphology-gremlin.js.map