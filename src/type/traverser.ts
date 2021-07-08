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
export class Traverser<S> {
  /**
   * The inner value of the traverser.
   */
  value: S;
  /**
   * Traverser path, ie. the value of each previous steps with their name
   */
  path: Array<{ label: string; value: unknown }> = [];

  /**
   * Default constructor.
   */
  constructor(value: S, path?: Array<{ label: string; value: unknown }>) {
    this.value = value;
    if (path) this.path = path;
  }

  /**
   * Return the value of the traverser.
   */
  get(): S {
    return this.value;
  }

  /**
   * Return the path of the traverser.
   */
  getPath(): Array<{ label: string; value: unknown }> {
    return this.path;
  }

  /**
   * Create a new traverser for the next iteration.
   */
  makeNextTraverser<T>(label: string, value: T) {
    const copyPath = this.path.slice();
    copyPath.push({ label, value });
    return new Traverser<T>(value, copyPath);
  }

  // loops();
  // bulk();
  // sack();
  // sideEffects(arg?: string);
}
