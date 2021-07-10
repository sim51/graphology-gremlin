import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - unfold", function() {
  it("should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .fold()
      .unfold()
      .toList();

    assert.equal(result.length, graph.order);
  });
});
