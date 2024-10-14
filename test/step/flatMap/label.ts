import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - FlatMap - label", function () {
  test("should work on Vertex", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").label().toList();

    expect(result.length).toEqual(2);
    expect(result.includes("Person")).toBeTruthy();
    expect(result.includes("Man") || result.includes("Woman") || result.includes("Other")).toBeTruthy();
  });

  test("should work on Edge", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.E().tail().label().toList();

    expect(result.length).toEqual(1);
    expect(result.includes("KNOWS") || result.includes("FRIEND_OF") || result.includes("COLLEAGUE_OF")).toBeTruthy();
  });
});
