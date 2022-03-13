import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../src/index";
import { Order, Values } from "../../../../src/types";

const graph = generateRandomGraph();

describe("Step - Map - collectingBarrier - order", function() {
  describe("number", function() {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .values("age")
        .order()
        .toList() as Array<number>;

      result.forEach((row: number, index: number) => {
        if (index < result.length - 1) {
          assert.equal(row <= result[index + 1], true);
        }
      });
    });

    it("should work with by asc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .values("age")
        .order()
        .by(Order.asc)
        .toList() as Array<number>;

      result.forEach((row: number, index: number) => {
        if (index < result.length - 1) {
          assert.equal(row <= result[index + 1], true);
        }
      });
    });

    it("should work with by desc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .values("age")
        .order()
        .by(Order.desc)
        .toList() as Array<number>;

      result.forEach((row: number, index: number) => {
        if (index < result.length - 1) {
          assert.equal(row >= result[index + 1], true);
        }
      });
    });
  });

  describe("object", function() {
    it("should work with by age asc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .valueMap()
        .order()
        .by("age", "asc")
        .toList() as Array<Values>;

      result.forEach((row: Values, index: number) => {
        if (index < result.length - 1) {
          assert.equal((row.age as number) <= (result[index + 1].age as number), true);
        }
      });
    });

    it("should work with by age desc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .valueMap()
        .order()
        .by("age", "desc")
        .toList() as Array<Values>;

      result.forEach((row: Values, index: number) => {
        if (index < result.length - 1) {
          assert.equal((row.age as number) >= (result[index + 1].age as number), true);
        }
      });
    });

    it("should work with by age desc, name asc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .valueMap()
        .order()
        .by("age", "desc")
        .by("name")
        .toList() as Array<Values>;

      result.forEach((row: Values, index: number) => {
        if (index < result.length - 1) {
          assert.equal((row.age as number) >= (result[index + 1].age as number), true);
          if (row.age === result[index + 1].age) {
            assert.equal((row.name as string) < (result[index + 1].name as string), true);
          }
        }
      });
    });
  });
});
