import assert from "assert";
import { omit } from "lodash";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - valueMap", function() {
  it("should work on valueMap", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .valueMap()
      .valueMap()
      .toList();

    assert.equal(result.length, graph.order);
    assert.deepEqual(result[0], omit(graph.getNodeAttributes(graph.nodes()[0]), ["@labels"]));
  });

  it("should work on Vertex", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .valueMap()
      .toList();

    assert.equal(result.length, graph.order);
    assert.deepEqual(result[0], omit(graph.getNodeAttributes(graph.nodes()[0]), ["@labels"]));
  });

  it("should work on Edge", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .E()
      .valueMap()
      .toList();

    assert.equal(result.length, graph.size);
    assert.deepEqual(result[0], omit(graph.getEdgeAttributes(graph.edges()[0]), ["@type"]));
  });
});
