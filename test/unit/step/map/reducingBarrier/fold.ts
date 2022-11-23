import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - fold", function () {
  it("should work on vertex", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().fold().next().value;

    assert.equal(result instanceof Array, true);
    assert.equal(result.length, graph.order);
  });

  it("should work on edge", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().fold().next().value;

    assert.equal(result instanceof Array, true);
    assert.equal(result.length, graph.size);
  });

  it("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().id().fold().next().value;
    assert.deepEqual(result, graph.nodes());
  });
});
