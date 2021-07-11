import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - sideEffect - inject", function() {
  it("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .identity()
      .inject("-5", "-4", "-3", "-2", "-1")
      .toList();
    assert.deepEqual(result, ["-5", "-4", "-3", "-2", "-1"].concat(graph.nodes()));
  });
});
