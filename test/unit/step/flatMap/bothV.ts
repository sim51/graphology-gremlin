import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - FlatMap - bothV", function () {
  it("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().bothV().toList();
    assert.equal(result.length, 2 * graph.size);
  });
});
