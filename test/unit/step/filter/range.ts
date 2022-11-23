import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - dedup", function () {
  it("should work with full range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(0, 11).toList();
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should work with partial range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(5, 7).toList();
    assert.deepEqual(result, [5, 6]);
  });

  it("should work with range of size 1", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(5, 6).toList();
    assert.deepEqual(result, [5]);
  });

  it("should work with bigger range than result", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).range(0, 100).toList();
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
