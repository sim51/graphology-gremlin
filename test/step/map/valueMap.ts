import { omit } from "lodash";
import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Map - valueMap", function () {
  test("should work on valueMap", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().valueMap().valueMap().toList();

    expect(result.length).toEqual(graph.order);
    expect(result[0]).toEqual(omit(graph.getNodeAttributes(graph.nodes()[0]), ["@labels"]));
  });

  test("should work on Vertex", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().valueMap().toList();

    expect(result.length).toEqual(graph.order);
    expect(result[0]).toEqual(omit(graph.getNodeAttributes(graph.nodes()[0]), ["@labels"]));
  });

  test("should work on Edge", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().valueMap().toList();

    expect(result.length).toEqual(graph.size);
    expect(result[0]).toEqual(omit(graph.getEdgeAttributes(graph.edges()[0]), ["@type"]));
  });
});
