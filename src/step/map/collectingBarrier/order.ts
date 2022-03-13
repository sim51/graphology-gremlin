import { orderBy } from "lodash";
import { GraphTraversal } from "../../../traversal/graphTraversal";
import { Order, Traverser } from "../../../types";
import { CollectingBarrierStep } from "./generic";

/**
 * Return the count of the incoming values.
 * @see https://tinkerpop.apache.org/docs/current/reference/#fold-step
 */
export class OrderStep<T> extends CollectingBarrierStep<T, T> {
  iteratees: Array<string> = [];
  orders: Array<"asc" | "desc"> = [];

  constructor(traversal: GraphTraversal<unknown, T>) {
    super(
      "order",
      traversal,
      (values: Array<Traverser<T>>): Array<Traverser<T>> => {
        if (this.iteratees.length > 0) {
          return orderBy(values, this.iteratees, this.orders);
        } else {
          return orderBy(values, "value");
        }
      },
    );
  }

  by(name?: string, order?: Order | string): void {
    if (!order && (name === Order.asc || name === Order.desc || name === "asc" || name === "desc")) {
      order = name;
      name = undefined;
    }
    this.iteratees.push(`value${name ? "." + name : ""}`);
    this.orders.push((order ? order.toString() : Order.asc.toString()) as "asc" | "desc");
  }
}
