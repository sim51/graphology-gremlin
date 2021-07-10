import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - hasNot", function() {
  describe("Vertex", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .hasNot("name")
        .toList();
      assert.equal(result.length, 0);
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .hasNot("name", "email")
        .toList();
      assert.deepEqual(result.length, 0);
    });

    it("with values and one existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .hasNot("azertyuiop", "name")
        .toList();

      assert.equal(result.length, 0);
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .hasNot("azertyuiop")
        .toList();

      assert.equal(result.length, graph.order);
    });

    it("with multiple non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .hasNot("azertyuiop", "poiuytra")
        .toList();

      assert.equal(result.length, graph.order);
    });
  });

  describe("Edge", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .E()
        .hasNot("weight")
        .toList();
      assert.equal(result.length, 0);
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .E()
        .hasNot("weight", "timestamp")
        .toList();
      assert.deepEqual(result.length, 0);
    });

    it("with values and one existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .E()
        .hasNot("azertyuiop", "weight")
        .toList();

      assert.equal(result.length, 0);
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .E()
        .hasNot("azertyuiop")
        .toList();

      assert.equal(result.length, graph.size);
    });

    it("with multiple non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .E()
        .hasNot("azertyuiop", "poiuytra")
        .toList();

      assert.equal(result.length, graph.size);
    });
  });

  describe("Object", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .propertiesMap()
        .hasNot("name")
        .toList();
      assert.equal(result.length, 0);
    });

    it("with values should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .propertiesMap()
        .hasNot("name", "email")
        .toList();
      assert.deepEqual(result.length, 0);
    });

    it("with values and one existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .propertiesMap()
        .hasNot("azertyuiop", "name")
        .toList();

      assert.equal(result.length, 0);
    });

    it("with non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .propertiesMap()
        .hasNot("azertyuiop")
        .toList();

      assert.equal(result.length, graph.order);
    });

    it("with multiple non-existing key should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .propertiesMap()
        .hasNot("azertyuiop", "poiuytra")
        .toList();

      assert.equal(result.length, graph.order);
    });
  });
});
