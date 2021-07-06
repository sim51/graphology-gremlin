import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - properties", function() {
  describe("Vertex", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .properties()
        .toList()[0];

      assert.deepEqual(result, graph.getNodeAttributes(nodeId));
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .properties("name", "email", "valid")
        .toList()[0];
      assert.equal(Object.keys(result).length, 3);
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .properties("azertyuiop")
        .toList()[0];

      assert.deepEqual(result, {});
    });
  });

  describe("Edge", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g
        .E()
        .hasId(edgeId)
        .properties()
        .toList()[0];

      assert.deepEqual(result, graph.getEdgeAttributes(edgeId));
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g
        .E()
        .hasId(edgeId)
        .toList();
      assert.equal(Object.keys(result).length, 1);
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const edgeId = graph.edges()[0];
      const result = g
        .E()
        .hasId(edgeId)
        .properties("azertyuiop")
        .toList()[0];

      assert.deepEqual(result, {});
    });
  });

  describe("Object", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .properties()
        .properties()
        .toList()[0];

      assert.deepEqual(result, graph.getNodeAttributes(nodeId));
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .properties()
        .properties("name", "email", "valid")
        .toList()[0];

      assert.equal(Object.keys(result).length, 3);
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .properties()
        .properties("azertyuiop")
        .toList()[0];

      assert.deepEqual(result, {});
    });
  });
});
