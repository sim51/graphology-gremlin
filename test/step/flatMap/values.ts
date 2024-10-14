import { omit, pick, valuesIn } from "lodash";
import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - values", function () {
  describe("Vertex", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g.V(id).values().toList();

      expect(result.sort()).toEqual(valuesIn(omit(attrs, ["@labels"])).sort());
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g.V(id).values("email", "name").toList();

      expect(result.sort()).toEqual(valuesIn(pick(attrs, ["email", "name"])).sort());
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V(id).values("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });

  describe("Edge", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const attrs = graph.getEdgeAttributes(id);
      const result = g.E(id).values().toList();

      expect(result.sort()).toEqual(valuesIn(omit(attrs, ["@type"])).sort());
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const attrs = graph.getEdgeAttributes(id);
      const result = g.E(id).values("timestamp").toList();

      expect(result.sort()).toEqual(valuesIn(pick(attrs, ["timestamp"])).sort());
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E(id).values("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });

  describe("Object", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g.V(id).propertiesMap().values().toList();

      expect(result.sort()).toEqual(valuesIn(omit(attrs, ["@labels"])).sort());
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g.V(id).propertiesMap("email", "name").values().toList();

      expect(result.sort()).toEqual(valuesIn(pick(attrs, ["email", "name"])).sort());
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).propertiesMap().values("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });
});
