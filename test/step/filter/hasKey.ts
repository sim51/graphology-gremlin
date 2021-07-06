import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { Vertex, Edge, Object } from "../../../src/type";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - hasKey", function() {
  describe("Vertex", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g
        .V()
        .hasId(id)
        .hasKey("name")
        .toList()[0] as Vertex;
      assert.deepEqual(result.properties, graph.getNodeAttributes(id));
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .hasKey("name", "email", "valid")
        .toList()[0] as Vertex;
      assert.deepEqual(result.properties, graph.getNodeAttributes(nodeId));
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .hasKey("azertyuiop")
        .toList();

      assert.equal(result.length, 0);
    });

    it("with values with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const nodeId = graph.nodes()[0];
      const result = g
        .V()
        .hasId(nodeId)
        .hasKey("name", "email", "valid", "azertyuiop")
        .toList();

      assert.equal(result.length, 0);
    });
  });

  describe("Edge", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g
        .E()
        .hasId(id)
        .hasKey("weight")
        .toList()[0] as Edge;

      assert.deepEqual(result.properties, graph.getEdgeAttributes(id));
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g
        .E()
        .hasId(id)
        .hasKey("weight", "timestamp")
        .toList()[0] as Edge;
      assert.deepEqual(result.properties, graph.getEdgeAttributes(id));
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g
        .E()
        .hasId(id)
        .hasKey("azertyuiop")
        .toList();

      assert.equal(result.length, 0);
    });

    it("with values with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g
        .E()
        .hasId(id)
        .hasKey("weight", "timestamp", "azertyuiop")
        .toList();

      assert.equal(result.length, 0);
    });
  });

  describe("Object", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g
        .V()
        .hasId(id)
        .properties()
        .hasKey("name")
        .toList()[0] as Object;

      assert.deepEqual(result, graph.getNodeAttributes(id));
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g
        .V()
        .hasId(id)
        .properties()
        .hasKey("name", "email", "valid")
        .toList()[0] as Object;

      assert.deepEqual(result, graph.getNodeAttributes(id));
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g
        .V()
        .hasId(id)
        .properties()
        .hasKey("azertyuiop")
        .toList();

      assert.equal(result.length, 0);
    });

    it("with values with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g
        .V()
        .hasId(id)
        .hasKey("name", "email", "valid", "azertyuiop")
        .toList();

      assert.equal(result.length, 0);
    });
  });
});
