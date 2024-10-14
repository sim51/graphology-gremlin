import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - properties", () => {
  describe("Vertex", () => {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g.V(nodeId).properties().toList();

      expect(result.map((row) => row[0]).sort()).toEqual(["age", "email", "name", "valid"]);
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g.V(nodeId).properties("email", "name").toList();

      expect(result.map((row) => row[0]).sort()).toEqual(["email", "name"]);
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g.V(nodeId).properties("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });

  describe("Edge", () => {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g.E(edgeId).properties().toList();

      expect(result.map((row) => row[0]).sort()).toEqual(["timestamp", "weight"]);
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g.E(edgeId).properties("timestamp").toList();

      expect(result.map((row) => row[0]).sort()).toEqual(["timestamp"]);
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g.E(edgeId).properties("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });

  describe("Object", () => {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g.V(nodeId).propertiesMap().properties().toList();

      expect(result.map((row) => row[0]).sort()).toEqual(["age", "email", "name", "valid"]);
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g.V(nodeId).propertiesMap("email", "name").properties().toList();

      expect(result.map((row) => row[0]).sort()).toEqual(["email", "name"]);
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g.V().hasId(nodeId).propertiesMap().properties("azertyuiop").toList();

      expect(result.length).toEqual(0);
    });
  });
});
