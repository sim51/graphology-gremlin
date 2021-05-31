"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=generic.js.map