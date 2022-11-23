import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - max", function () {
  it("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().id().max().next().value, 99);
  });

  it("should work on property", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().values("age").max().next().value > 0, true);
  });
});
