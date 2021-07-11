import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - dedup", function() {
  it("should work on number", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<number>(1, 2, 3, 4, 5, 1, 2, 3, 4, 5)
      .dedup()
      .toList();
    assert.deepEqual(result, [1, 2, 3, 4, 5]);
  });

  it("should work on object/map", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .inject<{ a: number; b: string }>(
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
    assert.deepEqual(result, [
      { a: 1, b: "test" },
      { a: 2, b: "test" },
      { a: 3, b: "test" },
      { a: 4, b: "test" },
      { a: 5, b: "test" },
    ]);
  });

  it("should work on nodes", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .out()
      .dedup()
      .toList();
    assert.equal(result.length, graph.order);
  });
});
