import assert from "assert";
import { generateRandomGraph } from "./utils";
import { GraphTraversalSource } from "../src/index";

const graph = generateRandomGraph();

describe("Testing Gremlin", function() {
  it("get all nodes should work", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.V().toList().length, graph.order);
  });

  it("get all edges should work", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(g.E().toList().length, graph.size);
  });

  it("filter node by label should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .hasLabel("Person")
      .toList();

    assert.equal(result.length > 0, true);
    assert.equal(result.length <= graph.order, true);
  });

  it("out should work", async () => {
    const g = new GraphTraversalSource(graph);
    assert.equal(
      g
        .V()
        .out()
        .toList().length,
      graph.size,
    );
  });

  it("out with type should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .out("KNOWS")
      .toList();
    assert.equal(result.length > 0, true);
    assert.equal(result.length <= graph.size, true);
  });
});
