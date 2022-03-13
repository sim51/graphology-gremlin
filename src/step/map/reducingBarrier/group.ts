import { GraphTraversal } from "../../../traversal/graphTraversal";
import { ReducingBarrierStep } from "./generic";
import { Edge, Vertex, Values } from "../../../types";

/**
 * Group the traversal values
 * @see http://tinkerpop.apache.org/docs/3.5.0/reference/#group-step
 */
export class GroupStep<T> extends ReducingBarrierStep<T, { [key: string]: Array<T> }> {
  keyGroupping: string | null = null;
  valueProjection: string | null = null;

  constructor(traversal: GraphTraversal<unknown, { [key: string]: Array<T> }>) {
    super("group", traversal, {}, (previousValue: { [key: string]: Array<T> }, value: T) => {
      // compute the key of the grouping
      let keys: Array<string> = [String(value)];
      if (this.keyGroupping !== null && typeof value === "object") {
        // check for vertex and edge
        if (value instanceof Vertex || value instanceof Edge) {
          if (this.keyGroupping === "label") {
            keys = value instanceof Vertex ? value.labels : [value.type];
          } else {
            keys = [String(value.properties[this.keyGroupping])];
          }
        }
        // value should be map ?
        else {
          if (
            ((value as unknown) as Values)[this.keyGroupping] !== null &&
            ((value as unknown) as Values)[this.keyGroupping] !== undefined
          )
            keys = [String(((value as unknown) as Values)[this.keyGroupping])];
        }
      }

      // Do the grouping
      keys.forEach((key: string) => {
        if (previousValue[key]) {
          previousValue[key].push(value);
        } else {
          previousValue[key] = [value];
        }
      });

      return previousValue;
    });
  }

  by(projection: string): void {
    if (this.keyGroupping === null) {
      this.keyGroupping = projection;
    } else {
      this.valueProjection = projection;
    }
  }
}
