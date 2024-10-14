import { omit } from "lodash";
import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { Edge, Values, Vertex } from "../../../src/types";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - hasKey", function () {
  describe("Vertex", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name").toList()[0] as Vertex;
      expect(result.properties).toEqual(omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name", "email", "valid").toList()[0] as Vertex;
      expect(result.properties).toEqual(omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });

    test("with values with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name", "email", "valid", "azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });

  describe("Edge", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("weight").toList()[0] as Edge;

      expect(result.properties).toEqual(omit(graph.getEdgeAttributes(id), ["@type"]));
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("weight", "timestamp").toList()[0] as Edge;
      expect(result.properties).toEqual(omit(graph.getEdgeAttributes(id), ["@type"]));
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });

    test("with values with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("weight", "timestamp", "azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });

  describe("Object", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).propertiesMap().hasKey("name").toList()[0] as Values;

      expect(result).toEqual(omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).propertiesMap().hasKey("name", "email", "valid").toList()[0] as Values;

      expect(result).toEqual(omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).propertiesMap().hasKey("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });

    test("with values with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name", "email", "valid", "azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });
});
