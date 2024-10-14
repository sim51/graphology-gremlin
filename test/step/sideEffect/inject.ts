import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - sideEffect - inject", function () {
  test("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V().id().inject("-5", "-4", "-3", "-2", "-1").toList();
    expect(result).toEqual(["-5", "-4", "-3", "-2", "-1"].concat(graph.nodes()));
  });
});
