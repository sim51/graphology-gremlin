import assert from "assert";
import { valuesIn, pick, omit } from "lodash";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - values", function() {
  describe("Vertex", function() {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g
        .V(id)
        .values()
        .toList();

      assert.deepEqual(result.sort(), valuesIn(omit(attrs, ["@labels"])).sort());
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g
        .V(id)
        .values("email", "name")
        .toList();

      assert.deepEqual(result.sort(), valuesIn(pick(attrs, ["email", "name"])).sort());
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g
        .V(id)
        .values("azertyuiop")
        .toList();

      assert.equal(result.length === 0, true);
    });
  });

  describe("Edge", function() {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const attrs = graph.getEdgeAttributes(id);
      const result = g
        .E(id)
        .values()
        .toList();

      assert.deepEqual(result.sort(), valuesIn(omit(attrs, ["@type"])).sort());
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const attrs = graph.getEdgeAttributes(id);
      const result = g
        .E(id)
        .values("timestamp")
        .toList();

      assert.deepEqual(result.sort(), valuesIn(pick(attrs, ["timestamp"])).sort());
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.edges()[0];
      const result = g
        .E(id)
        .values("azertyuiop")
        .toList();

      assert.equal(result.length === 0, true);
    });
  });

  describe("Object", function() {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g
        .V(id)
        .propertiesMap()
        .values()
        .toList();

      assert.deepEqual(result.sort(), valuesIn(omit(attrs, ["@labels"])).sort());
    });

    it("with values should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const attrs = graph.getNodeAttributes(id);
      const result = g
        .V(id)
        .propertiesMap("email", "name")
        .values()
        .toList();

      assert.deepEqual(result.sort(), valuesIn(pick(attrs, ["email", "name"])).sort());
    });

    it("with non-existing key should work", () => {
      const g = new GraphTraversalSource(graph);
      const id = graph.nodes()[0];
      const result = g
        .V()
        .hasId(id)
        .propertiesMap()
        .values("azertyuiop")
        .toList();

      assert.equal(result.length === 0, true);
    });
  });
});
