import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - key", function() {
  it("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V(1)
      .properties()
      .key()
      .toList();

    assert.deepEqual(result, ["age", "email", "name", "valid"]);
  });
});
