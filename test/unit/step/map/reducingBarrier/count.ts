import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - count", function () {
  it("should work on count", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().count().count().next().value, 1);
  });

  it("should work on vertex", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().count().next().value, graph.order);
  });

  it("should work on edge", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.E().count().next().value, graph.size);
  });

  it("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().id().count().next().value, graph.order);
  });
});
