import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - identity", function() {
  describe("Vertex", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .identity()
        .toList();

      assert.deepEqual(result, graph.nodes());
    });
  });

  describe("Edge", function() {
    it("should work", async () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .E()
        .identity()
        .toList();

      assert.deepEqual(result, graph.edges());
    });
  });
});
