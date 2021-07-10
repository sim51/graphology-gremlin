import assert from "assert";
import { omit } from "lodash";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";
import { Vertex, Edge } from "../../../src/type";

const graph = generateRandomGraph();

describe("Step - Map - elementMap", function() {
  it("should work on Vertex", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .elementMap()
      .toList();

    const id = graph.nodes()[0];
    const attrs = graph.getNodeAttributes(id);
    const element = new Vertex(id, attrs["@labels"], omit(attrs, ["@labels"]));

    assert.equal(result.length, graph.order);
    assert.deepEqual(result[0], element.toMap());
  });

  it("should work on Edge", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .E()
      .elementMap()
      .toList();

    const id = graph.edges()[0];
    const attrs = graph.getEdgeAttributes(id);
    const element = new Edge(id, attrs["@type"], omit(attrs, ["@type"]));

    assert.equal(result.length, graph.size);
    assert.deepEqual(result[0], element.toMap());
  });
});
