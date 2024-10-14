import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - inV", function () {
  test("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().inV().toList();
    expect(result.length).toEqual(graph.size);
  });
});
