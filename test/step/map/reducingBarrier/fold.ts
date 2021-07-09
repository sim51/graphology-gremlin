import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - fold", function() {
  it("should work on vertex", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .fold()
      .next().value;

    assert.equal(result instanceof Array, true);
    assert.equal(result.length, graph.order);
  });

  it("should work on edge", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .E()
      .fold()
      .next().value;

    assert.equal(result instanceof Array, true);
    assert.equal(result.length, graph.size);
  });

  it("should work on identifier", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .identity()
      .fold()
      .next().value;
    assert.deepEqual(result, graph.nodes());
  });
});
