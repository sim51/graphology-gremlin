import assert from "assert";
import { omit } from "lodash";
import { generateRandomGraph } from "../../utils";
import { Vertex, Edge, Values } from "../../../../src/types";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - hasKey", function () {
  describe("Vertex", function () {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name").toList()[0] as Vertex;
      assert.deepEqual(result.properties, omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name", "email", "valid").toList()[0] as Vertex;
      assert.deepEqual(result.properties, omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("azertyuiop").toList();

      assert.equal(result.length, 0);
    });

    it("with values with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name", "email", "valid", "azertyuiop").toList();

      assert.equal(result.length, 0);
    });
  });

  describe("Edge", function () {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("weight").toList()[0] as Edge;

      assert.deepEqual(result.properties, omit(graph.getEdgeAttributes(id), ["@type"]));
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("weight", "timestamp").toList()[0] as Edge;
      assert.deepEqual(result.properties, omit(graph.getEdgeAttributes(id), ["@type"]));
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("azertyuiop").toList();

      assert.equal(result.length, 0);
    });

    it("with values with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g.E().hasId(id).hasKey("weight", "timestamp", "azertyuiop").toList();

      assert.equal(result.length, 0);
    });
  });

  describe("Object", function () {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).propertiesMap().hasKey("name").toList()[0] as Values;

      assert.deepEqual(result, omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).propertiesMap().hasKey("name", "email", "valid").toList()[0] as Values;

      assert.deepEqual(result, omit(graph.getNodeAttributes(id), ["@labels"]));
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).propertiesMap().hasKey("azertyuiop").toList();

      assert.equal(result.length, 0);
    });

    it("with values with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g.V().hasId(id).hasKey("name", "email", "valid", "azertyuiop").toList();

      assert.equal(result.length, 0);
    });
  });
});
