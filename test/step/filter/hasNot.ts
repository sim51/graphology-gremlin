import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - hasNot", function () {
  describe("Vertex", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().hasNot("name").toList();
      expect(result.length).toEqual(0);
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().hasNot("name", "email").toList();
      expect(result.length).toEqual(0);
    });

    test("with values and one existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().hasNot("azertyuiop", "name").toList();

      expect(result.length).toEqual(0);
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().hasNot("azertyuiop").toList();

      expect(result.length).toEqual(graph.order);
    });

    test("with multiple non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().hasNot("azertyuiop", "poiuytra").toList();

      expect(result.length).toEqual(graph.order);
    });
  });

  describe("Edge", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.E().hasNot("weight").toList();
      expect(result.length).toEqual(0);
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.E().hasNot("weight", "timestamp").toList();
      expect(result.length).toEqual(0);
    });

    test("with values and one existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.E().hasNot("azertyuiop", "weight").toList();

      expect(result.length).toEqual(0);
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.E().hasNot("azertyuiop").toList();

      expect(result.length).toEqual(graph.size);
    });

    test("with multiple non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.E().hasNot("azertyuiop", "poiuytra").toList();

      expect(result.length).toEqual(graph.size);
    });
  });

  describe("Object", function () {
    test("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().propertiesMap().hasNot("name").toList();
      expect(result.length).toEqual(0);
    });

    test("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().propertiesMap().hasNot("name", "email").toList();
      expect(result.length).toEqual(0);
    });

    test("with values and one existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().propertiesMap().hasNot("azertyuiop", "name").toList();

      expect(result.length).toEqual(0);
    });

    test("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().propertiesMap().hasNot("azertyuiop").toList();

      expect(result.length).toEqual(graph.order);
    });

    test("with multiple non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().propertiesMap().hasNot("azertyuiop", "poiuytra").toList();

      expect(result.length).toEqual(graph.order);
    });
  });
});
