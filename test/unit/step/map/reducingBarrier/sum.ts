import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - sum", function () {
  it("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().id().sum().next().value, 4950);
  });

  it("should work on property", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().values("age").sum().next().value > 0, true);
  });
});
