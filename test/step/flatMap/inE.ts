import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - inE", function() {
  it("without value should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .inE()
      .toList();
    assert.equal(result.length, graph.size);
  });
  it("with one value should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result1 = g
      .V()
      .inE("KNOWS")
      .toList();
    const result2 = g
      .V()
      .inE("FRIEND_OF")
      .toList();
    const result3 = g
      .V()
      .inE("COLLEAGUE_OF")
      .toList();
    assert.equal(result1.length + result2.length + result3.length, graph.size);
  });

  it("with values should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .inE("KNOWS", "FRIEND_OF", "COLLEAGUE_OF")
      .toList();
    assert.equal(result.length, graph.size);
  });
});
