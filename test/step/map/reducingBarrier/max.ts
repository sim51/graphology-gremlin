import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - max", function () {
  test("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().id().max().next().value).toEqual(99);
  });

  test("should work on property", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().values("age").max().next().value).greaterThan(0);
  });
});
