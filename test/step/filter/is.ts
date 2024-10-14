import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - is", function () {
  test("should work on number", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5).is(5).toList();
    expect(result).toEqual([5]);
  });

  test("should work on string", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject("1", "2", "3", "4", "5").is("5").toList();
    expect(result).toEqual(["5"]);
  });

  test("should work on object/map", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<{
        a: number;
        b: string;
      }>({ a: 1, b: "test" }, { a: 2, b: "test" }, { a: 3, b: "test" }, { a: 4, b: "test" }, { a: 5, b: "test" })
      .is({ a: 5, b: "test" })
      .toList();
    expect(result).toEqual([{ a: 5, b: "test" }]);
  });
});
