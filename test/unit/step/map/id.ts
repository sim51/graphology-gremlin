import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - id", function () {
  describe("Vertex", function () {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.V().id().toList();

      assert.deepEqual(result, graph.nodes());
    });
  });

  describe("Edge", function () {
    it("should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g.E().id().toList();

      assert.deepEqual(result, graph.edges());
    });
  });
});
