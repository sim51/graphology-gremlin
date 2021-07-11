import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - both", function() {
  it("without value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .both()
      .toList();
    assert.equal(result.length, 2 * graph.size);
  });
  it("with one value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result1 = g
      .V()
      .both("KNOWS")
      .toList();
    const result2 = g
      .V()
      .both("FRIEND_OF")
      .toList();
    const result3 = g
      .V()
      .both("COLLEAGUE_OF")
      .toList();
    assert.equal(result1.length + result2.length + result3.length, 2 * graph.size);
  });

  it("with values should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .both("KNOWS", "FRIEND_OF", "COLLEAGUE_OF")
      .toList();
    assert.equal(result.length, 2 * graph.size);
  });
});
