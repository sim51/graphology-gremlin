import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - dedup", function () {
  test("should work with full range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(0, 11).toList();
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("should work with partial range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(5, 7).toList();
    expect(result).toEqual([5, 6]);
  });

  test("should work with range of size 1", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(5, 6).toList();
    expect(result).toEqual([5]);
  });

  test("should work with bigger range than result", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(0, 100).toList();
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
