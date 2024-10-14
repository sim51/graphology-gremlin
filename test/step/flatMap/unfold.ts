import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - unfold", function () {
  test("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().fold().unfold().toList();

    expect(result.length).toEqual(graph.order);
  });
});
