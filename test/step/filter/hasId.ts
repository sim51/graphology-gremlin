import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - hasId", function () {
  describe("Vertex", function () {
    test("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().hasId("10").toList();
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual("10");
    });

    test("with multiple values should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().hasId("1", "2", "3").toList().length;
      expect(result).toEqual(3);
    });

    test("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      expect(g.V().hasId().toList().length).toEqual(0);
    });
  });

  describe("Edge", function () {
    test("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      expect(g.E().hasId(graph.edges()[0]).toList().length).toEqual(1);
    });

    test("with multiple values should work", () => {
      const g = new GraphTraversalSource(graph);
      expect(
        g
          .E()
          .hasId(...graph.edges())
          .toList().length,
      ).toEqual(graph.size);
    });

    test("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      expect(g.E().hasLabel().toList().length).toEqual(0);
    });
  });
});
