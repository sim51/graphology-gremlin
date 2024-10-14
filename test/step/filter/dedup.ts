import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - dedup", function () {
  test("should work on number", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 1, 2, 3, 4, 5).dedup().toList();
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("should work on object/map", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<{
        a: number;
        b: string;
      }>(
        { a: 1, b: "test" },
        { a: 2, b: "test" },
        { a: 3, b: "test" },
        { a: 4, b: "test" },
        { a: 5, b: "test" },
        { a: 1, b: "test" },
        { a: 2, b: "test" },
        { a: 3, b: "test" },
        { a: 4, b: "test" },
        { a: 5, b: "test" },
      )
      .dedup()
      .toList();
    expect(result).toEqual([
      { a: 1, b: "test" },
      { a: 2, b: "test" },
      { a: 3, b: "test" },
      { a: 4, b: "test" },
      { a: 5, b: "test" },
    ]);
  });

  test("should work on nodes", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().out().dedup().toList();
    expect(result.length).toEqual(graph.order);
  });
});
