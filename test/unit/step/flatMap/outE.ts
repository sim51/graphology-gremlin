import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - outE", function () {
  it("without value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().outE().toList();
    assert.equal(result.length, graph.size);
  });
  it("with one value should work", () => {
    const g = new GraphTraversalSource(graph);
    const result1 = g.V().outE("KNOWS").toList();
    const result2 = g.V().outE("FRIEND_OF").toList();
    const result3 = g.V().outE("COLLEAGUE_OF").toList();
    assert.equal(result1.length + result2.length + result3.length, graph.size);
  });

  it("with values should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().outE("KNOWS", "FRIEND_OF", "COLLEAGUE_OF").toList();
    assert.equal(result.length, graph.size);
  });
});
