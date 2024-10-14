import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - min", function () {
  test("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().id().min().next().value).toEqual(0);
  });

  test("should work on property", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().values("age").min().next().value).greaterThanOrEqual(0);
  });
});
