import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - mean", function() {
  it("should work on identifier", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(
      g
        .V()
        .identity()
        .mean()
        .next().value,
      49.5, // mean of 0,1,...,99
    );
  });

  it("should work on property", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(
      g
        .V()
        .values("age")
        .mean()
        .next().value > 0,
      true,
    );
  });
});
