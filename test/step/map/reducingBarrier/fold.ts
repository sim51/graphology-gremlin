import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - fold", function () {
  test("should work on vertex", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().fold().next().value;

    expect(result instanceof Array).toBeTruthy();
    expect(result.length).toEqual(graph.order);
  });

  test("should work on edge", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().fold().next().value;

    expect(result instanceof Array).toBeTruthy();
    expect(result.length).toEqual(graph.size);
  });

  test("should work on identifier", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().id().fold().next().value;
    expect(result).toEqual(graph.nodes());
  });
});
