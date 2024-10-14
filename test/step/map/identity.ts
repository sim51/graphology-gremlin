import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Map - identity", function () {
  test("should work on vertex", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().identity().toList()).toEqual(g.V().toList());
  });

  test("should work on edge", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.E().identity().toList()).toEqual(g.E().toList());
  });

  test("should work on id", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().id().toList()).toEqual(g.V().id().toList());
  });

  test("should work on object", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().valueMap().identity().toList()).toEqual(g.V().valueMap().toList());
  });
});
