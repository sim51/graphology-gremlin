import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - bothE", function() {
  it("without value should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .bothE()
      .toList();
    assert.equal(result.length, 2 * graph.size);
  });
  it("with one value should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result1 = g
      .V()
      .bothE("KNOWS")
      .toList();
    const result2 = g
      .V()
      .bothE("FRIEND_OF")
      .toList();
    const result3 = g
      .V()
      .bothE("COLLEAGUE_OF")
      .toList();
    assert.equal(result1.length + result2.length + result3.length, 2 * graph.size);
  });

  it("with values should work", async () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .bothE("KNOWS", "FRIEND_OF", "COLLEAGUE_OF")
      .toList();
    assert.equal(result.length, 2 * graph.size);
  });
});
