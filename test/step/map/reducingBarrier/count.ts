import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - count", function() {
  it("should work on count", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(
      g
        .V()
        .count()
        .count(),
      1,
    );
  });

  it("should work on vertex", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().count(), graph.size);
  });

  it("should work on edge", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.E().count(), graph.order);
  });

  it("should work on identifier", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(
      g
        .V()
        .identity()
        .count(),
      graph.size,
    );
  });
});
