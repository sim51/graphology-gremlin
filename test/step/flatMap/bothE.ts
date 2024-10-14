import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - bothE", function () {
  test("without value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().bothE().toList();
    expect(result.length).toEqual(2 * graph.size);
  });
  test("with one value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result1 = g.V().bothE("KNOWS").toList();
    const result2 = g.V().bothE("FRIEND_OF").toList();
    const result3 = g.V().bothE("COLLEAGUE_OF").toList();
    expect(result1.length + result2.length + result3.length).toEqual(2 * graph.size);
  });

  test("with values should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().bothE("KNOWS", "FRIEND_OF", "COLLEAGUE_OF").toList();
    expect(result.length).toEqual(2 * graph.size);
  });
});
