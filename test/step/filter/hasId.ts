import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - hasId", function() {
  describe("Vertex", function() {
    it("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .hasId("10")
        .toList();
      assert.equal(result.length, 1);
      assert.equal(result[0].id, "10");
    });

    it("with multiple values should work", () => {
      const g = new GraphTraversalSource(graph);
      const result = g
        .V()
        .hasId("1", "2", "3")
        .toList().length;
      assert.equal(result, 3);
    });

    it("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      assert.equal(
        g
          .V()
          .hasId()
          .toList().length,
        0,
      );
    });
  });

  describe("Edge", function() {
    it("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      assert.equal(
        g
          .E()
          .hasId(graph.edges()[0])
          .toList().length,
        1,
      );
    });

    it("with multiple values should work", () => {
      const g = new GraphTraversalSource(graph);
      assert.equal(
        g
          .E()
          .hasId(...graph.edges())
          .toList().length,
        graph.size,
      );
    });

    it("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      assert.equal(
        g
          .E()
          .hasLabel()
          .toList().length,
        0,
      );
    });
  });
});
