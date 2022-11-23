import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - is", function () {
  it("should work on number", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5).is(5).toList();
    assert.deepEqual(result, [5]);
  });

  it("should work on string", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject("1", "2", "3", "4", "5").is("5").toList();
    assert.deepEqual(result, ["5"]);
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
      )
      .is({ a: 5, b: "test" })
      .toList();
    assert.deepEqual(result, [{ a: 5, b: "test" }]);
  });
});
