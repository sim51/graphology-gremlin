import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { Order, Values } from "../../../../src/types";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - collectingBarrier - order", function () {
  describe("number", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().values("age").order().toList() as Array<number>;

      result.forEach((row: number, index: number) => {
        if (index < result.length - 1) {
          expect(row <= result[index + 1]).toBeTruthy();
        }
      });
    });

    test("should work with by asc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().values("age").order().by(Order.asc).toList() as Array<number>;

      result.forEach((row: number, index: number) => {
        if (index < result.length - 1) {
          expect(row <= result[index + 1]).toBeTruthy();
        }
      });
    });

    test("should work with by desc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().values("age").order().by(Order.desc).toList() as Array<number>;

      result.forEach((row: number, index: number) => {
        if (index < result.length - 1) {
          expect(row >= result[index + 1]).toBeTruthy();
        }
      });
    });
  });

  describe("object", function () {
    test("should work with by age asc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().valueMap().order().by("age", "asc").toList() as Array<Values>;

      result.forEach((row: Values, index: number) => {
        if (index < result.length - 1) {
          expect((row.age as number) <= (result[index + 1].age as number)).toBeTruthy();
        }
      });
    });

    test("should work with by age desc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().valueMap().order().by("age", "desc").toList() as Array<Values>;

      result.forEach((row: Values, index: number) => {
        if (index < result.length - 1) {
          expect((row.age as number) >= (result[index + 1].age as number)).toBeTruthy();
        }
      });
    });

    test("should work with by age desc, name asc", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().valueMap().order().by("age", "desc").by("name").toList() as Array<Values>;

      result.forEach((row: Values, index: number) => {
        if (index < result.length - 1) {
          expect((row.age as number) >= (result[index + 1].age as number)).toBeTruthy();
          if (row.age === result[index + 1].age) {
            expect((row.name as string) < (result[index + 1].name as string)).toBeTruthy();
          }
        }
      });
    });
  });
});
