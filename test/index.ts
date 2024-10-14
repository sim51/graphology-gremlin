import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../src/index";
import { generateRandomGraph } from "./utils";

const graph = generateRandomGraph();

describe("Testing Gremlin", function () {
  test("get all nodes should work", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().toList().length).toEqual(graph.order);
  });

  test("get all edges should work", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.E().toList().length).toEqual(graph.size);
  });

  test("filter node by label should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().hasLabel("Person").toList();

    expect(result.length).greaterThan(0);
    expect(result.length).lessThanOrEqual(graph.order);
  });

  test("out should work", () => {
    const g = new GraphTraversalSource(graph);
    expect(g.V().out().toList().length).toEqual(graph.size);
  });

  test("out wtesth type should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().out("KNOWS").toList();
    expect(result.length).greaterThan(0);
    expect(result.length).lessThanOrEqual(graph.size);
  });

  test("start wtesth inject should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.inject<number>(1, 2, 3, 4, 5).toList();
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
