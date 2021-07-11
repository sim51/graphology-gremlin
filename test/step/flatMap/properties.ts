import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - properties", function() {
  describe("Vertex", function() {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V(nodeId)
        .properties()
        .toList();

      assert.deepEqual(result.map(row => row[0]).sort(), ["age", "email", "name", "valid"]);
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V(nodeId)
        .properties("email", "name")
        .toList();

      assert.deepEqual(result.map(row => row[0]).sort(), ["email", "name"]);
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V(nodeId)
        .properties("azertyuiop")
        .toList();

      assert.equal(result.length === 0, true);
    });
  });

  describe("Edge", function() {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g
        .E(edgeId)
        .properties()
        .toList();

      assert.deepEqual(result.map(row => row[0]).sort(), ["timestamp", "weight"]);
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g
        .E(edgeId)
        .properties("timestamp")
        .toList();

      assert.deepEqual(result.map(row => row[0]).sort(), ["timestamp"]);
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g
        .E(edgeId)
        .properties("azertyuiop")
        .toList();

      assert.equal(result.length === 0, true);
    });
  });

  describe("Object", function() {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V(nodeId)
        .propertiesMap()
        .properties()
        .toList();

      assert.deepEqual(result.map(row => row[0]).sort(), ["age", "email", "name", "valid"]);
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V(nodeId)
        .propertiesMap("email", "name")
        .properties()
        .toList();

      assert.deepEqual(result.map(row => row[0]).sort(), ["email", "name"]);
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .propertiesMap()
        .properties("azertyuiop")
        .toList();

      assert.equal(result.length === 0, true);
    });
  });
});
