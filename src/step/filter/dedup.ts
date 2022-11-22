// import hash from "object-hash";
import { Traverser } from "../../types";
import { GraphTraversal } from "../../traversal/graphTraversal";
import { FilterStep } from "./generic";

/**
 * Filter the traverser by return disctint values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#dedup-step
 */
export class DedupStep<T> extends FilterStep<T> {
  alreadyReturned = new Set<string>();

  constructor(traversal: GraphTraversal<unknown, T>) {
    super("Dedup", traversal, (traverser: Traverser<T>): boolean => {
      const id = `${JSON.stringify(traverser.value)}`; //hash(traverser.value);
      const result = this.alreadyReturned.has(id);
      if (result === false) {
        this.alreadyReturned.add(id);
      }
      return !result;
    });
  }
}
