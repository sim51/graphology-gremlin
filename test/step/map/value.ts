import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - value", function () {
  it("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").properties().value().toList();

    assert.equal(result.length, 4);
  });
});
