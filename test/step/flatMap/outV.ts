import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - outV", function() {
  it("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .outV()
      .toList();
    assert.equal(result.length, graph.size);
  });
});
