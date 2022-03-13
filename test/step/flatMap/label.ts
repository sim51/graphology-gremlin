import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - label", function () {
  it("should work on Vertex", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").label().toList();

    assert.equal(result.length, 2);
    assert.equal(result.includes("Person"), true);
    assert.equal(result.includes("Man") || result.includes("Woman") || result.includes("Other"), true);
  });

  it("should work on Edge", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().tail().label().toList();

    assert.equal(result.length, 1);
    assert.equal(result.includes("KNOWS") || result.includes("FRIEND_OF") || result.includes("COLLEAGUE_OF"), true);
  });
});
