import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - identity", function() {
  it("should work on vertex", () => {
    const g = new GraphTraversalSource(graph);
    assert.deepEqual(
      g
        .V()
        .identity()
        .toList(),
      g.V().toList(),
    );
  });

  it("should work on edge", () => {
    const g = new GraphTraversalSource(graph);
    assert.deepEqual(
      g
        .E()
        .identity()
        .toList(),
      g.E().toList(),
    );
  });

  it("should work on id", () => {
    const g = new GraphTraversalSource(graph);
    assert.deepEqual(
      g
        .V()
        .id()
        .toList(),
      g
        .V()
        .id()
        .toList(),
    );
  });

  it("should work on object", () => {
    const g = new GraphTraversalSource(graph);
    assert.deepEqual(
      g
        .V()
        .valueMap()
        .identity()
        .toList(),
      g
        .V()
        .valueMap()
        .toList(),
    );
  });
});
