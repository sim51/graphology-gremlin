import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Map - id", function () {
  describe("Vertex", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().id().toList();

      expect(result).toEqual(graph.nodes());
    });
  });

  describe("Edge", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.E().id().toList();

      expect(result).toEqual(graph.edges());
    });
  });
});
