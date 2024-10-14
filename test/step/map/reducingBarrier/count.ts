import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - count", function () {
  test("should work on count", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().count().count().next().value).toEqual(1);
  });

  test("should work on vertex", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().count().next().value).toEqual(graph.order);
  });

  test("should work on edge", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.E().count().next().value).toEqual(graph.size);
  });

  test("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().id().count().next().value).toEqual(graph.order);
  });
});
