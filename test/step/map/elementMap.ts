import { omit } from "lodash";
import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { Edge, Vertex } from "../../../src/types";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Map - elementMap", function () {
  test("should work on Vertex", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().elementMap().toList();

    const id = graph.nodes()[0];
    const attrs = graph.getNodeAttributes(id);
    const element = new Vertex(id, attrs["@labels"], omit(attrs, ["@labels"]));

    expect(result.length).toEqual(graph.order);
    expect(result[0]).toEqual(element.toMap());
  });

  test("should work on Edge", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().elementMap().toList();

    const id = graph.edges()[0];
    const attrs = graph.getEdgeAttributes(id);
    const element = new Edge(id, attrs["@type"], omit(attrs, ["@type"]));

    expect(result.length).toEqual(graph.size);
    expect(result[0]).toEqual(element.toMap());
  });
});
