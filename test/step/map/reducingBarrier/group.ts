import assert from "assert";
import { generateRandomGraph } from "../../../utils";
import { GraphTraversalSource } from "../../../../src/index";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - group", function() {
  it("should work on vertex by label", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .group()
      .by("label")
      .next().value;

    assert.equal(result["Man"].length > 0, true);
    assert.equal(result["Woman"].length > 0, true);
    assert.equal(result["Other"].length > 0, true);
    assert.equal(result["Person"].length, graph.order);
    assert.equal(result["Man"].length + result["Woman"].length + result["Other"].length, graph.order);
  });

  it("should work on vertex by prop", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .group()
      .by("valid")
      .next().value;

    assert.equal(result["true"].length > 0, true);
    assert.equal(result["false"].length > 0, true);
    assert.equal(result["true"].length + result["false"].length, graph.order);
  });

  it("should work on edge by label", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .E()
      .group()
      .by("label")
      .next().value;

    assert.equal(result["KNOWS"].length > 0, true);
    assert.equal(result["FRIEND_OF"].length > 0, true);
    assert.equal(result["COLLEAGUE_OF"].length > 0, true);
    assert.equal(result["KNOWS"].length + result["FRIEND_OF"].length + result["COLLEAGUE_OF"].length, graph.size);
  });

  it("should work on edge by prop", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .E()
      .group()
      .by("weight")
      .next().value;

    assert.equal(result["0"].length > 0, true);
    assert.equal(result["1"].length > 0, true);
    assert.equal(result["2"].length > 0, true);
    assert.equal(result["3"].length > 0, true);
    assert.equal(result["4"].length > 0, true);
    assert.equal(result["5"].length > 0, true);
    assert.equal(result["6"].length > 0, true);
    assert.equal(result["7"].length > 0, true);
    assert.equal(result["8"].length > 0, true);
    assert.equal(result["9"].length > 0, true);
  });

  it("should work on map", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .valueMap()
      .group()
      .by("valid")
      .next().value;

    assert.equal(result["true"].length > 0, true);
    assert.equal(result["false"].length > 0, true);
    assert.equal(result["true"].length + result["false"].length, graph.order);
  });

  it("should work on a value", () => {
    const g = new GraphTraversalSource(graph);
    const result = g
      .V()
      .properties("valid")
      .value()
      .group()
      .next().value;

    assert.equal(result["true"].length > 0, true);
    assert.equal(result["false"].length > 0, true);
    assert.equal(result["true"].length + result["false"].length, graph.order);
  });
});
