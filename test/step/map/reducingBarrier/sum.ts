import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - sum", function () {
  test("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().id().sum().next().value).toEqual(4950);
  });

  test("should work on property", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().values("age").sum().next().value).greaterThan(0);
  });
});
