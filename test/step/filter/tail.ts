import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - tail", function() {
  it("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .tail()
      .toList();
    assert.deepEqual(result, [10]);
  });

  it("should work with full range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .tail(10)
      .toList();
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should work with partial range", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .tail(2)
      .toList();
    assert.deepEqual(result, [9, 10]);
  });

  it("should work with bigger range than result", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .tail(100)
      .toList();
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
