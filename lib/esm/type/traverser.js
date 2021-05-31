"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=traverser.js.map