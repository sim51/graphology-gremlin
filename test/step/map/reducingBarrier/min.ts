import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - min", function() {
  it("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(
      g
        .V()
        .id()
        .min()
        .next().value,
      0,
    );
  });

  it("should work on property", () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(
      g
        .V()
        .values("age")
        .min()
        .next().value >= 0,
      true,
    );
  });
});
