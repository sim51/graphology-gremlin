import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../../src/index";
import { generateRandomGraph } from "../../../utils";

const graph = generateRandomGraph();

describe("Step - Map - reducingBarrier - group", function () {
  test("should work on vertex by label", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().group().by("label").next().value;

    expect(result["Man"].length).greaterThan(0);
    expect(result["Woman"].length).greaterThan(0);
    expect(result["Other"].length).greaterThan(0);
    expect(result["Person"].length).toEqual(graph.order);
    expect(result["Man"].length + result["Woman"].length + result["Other"].length).toEqual(graph.order);
  });

  test("should work on vertex by prop", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().group().by("valid").next().value;

    expect(result["true"].length).greaterThan(0);
    expect(result["false"].length).greaterThan(0);
    expect(result["true"].length + result["false"].length).toEqual(graph.order);
  });

  test("should work on edge by label", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().group().by("label").next().value;

    expect(result["KNOWS"].length).greaterThan(0);
    expect(result["FRIEND_OF"].length).greaterThan(0);
    expect(result["COLLEAGUE_OF"].length).greaterThan(0);
    expect(result["KNOWS"].length + result["FRIEND_OF"].length + result["COLLEAGUE_OF"].length).toEqual(graph.size);
  });

  test("should work on edge by prop", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().group().by("weight").next().value;

    expect(result["0"].length).greaterThan(0);
    expect(result["1"].length).greaterThan(0);
    expect(result["2"].length).greaterThan(0);
    expect(result["3"].length).greaterThan(0);
    expect(result["4"].length).greaterThan(0);
    expect(result["5"].length).greaterThan(0);
    expect(result["6"].length).greaterThan(0);
    expect(result["7"].length).greaterThan(0);
    expect(result["8"].length).greaterThan(0);
    expect(result["9"].length).greaterThan(0);
  });

  test("should work on map", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().valueMap().group().by("valid").next().value;

    expect(result["true"].length).greaterThan(0);
    expect(result["false"].length).greaterThan(0);
    expect(result["true"].length + result["false"].length).toEqual(graph.order);
  });

  test("should work on a value", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().properties("valid").value().group().next().value;

    expect(result["true"].length).greaterThan(0);
    expect(result["false"].length).greaterThan(0);
    expect(result["true"].length + result["false"].length).toEqual(graph.order);
  });
});
