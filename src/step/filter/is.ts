import { isEqual } from "lodash";

import { GraphTraversal } from "../../traversal/graphTraversal";
import { Traverser } from "../../types";
import { FilterStep } from "./generic";

/**
 * Filter the traverser if its element equals the specifiedvalue
 */
export class IsStep<T> extends FilterStep<T> {
  constructor(traversal: GraphTraversal<unknown, T>, value: T) {
    super("is", traversal, (traverser: Traverser<T>): boolean => {
      return isEqual(traverser.value, value);
    });
  }
}
