import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - mean", function () {
  test("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().id().mean().next().value).toEqual(
      49.5, // mean of 0,1,...,99
    );
  });

  test("should work on property", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().values("age").mean().next().value).greaterThan(0);
  });
});
