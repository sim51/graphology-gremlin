import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - bothV", function () {
  test("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().bothV().toList();
    expect(result.length).toEqual(2 * graph.size);
  });
});
