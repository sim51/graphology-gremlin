import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - in", function () {
  test("without value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().in().toList();
    expect(result.length).toEqual(graph.size);
  });
  test("with one value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result1 = g.V().in("KNOWS").toList();
    const result2 = g.V().in("FRIEND_OF").toList();
    const result3 = g.V().in("COLLEAGUE_OF").toList();
    expect(result1.length + result2.length + result3.length).toEqual(graph.size);
  });

  test("with values should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().in("KNOWS", "FRIEND_OF", "COLLEAGUE_OF").toList();
    expect(result.length).toEqual(graph.size);
  });
});
