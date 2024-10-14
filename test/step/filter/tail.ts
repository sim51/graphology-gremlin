import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - tail", function () {
  test("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).tail().toList();
    expect(result).toEqual([10]);
  });

  test("should work with full range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).tail(10).toList();
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("should work with partial range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).tail(2).toList();
    expect(result).toEqual([9, 10]);
  });

  test("should work with bigger range than result", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).tail(100).toList();
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
