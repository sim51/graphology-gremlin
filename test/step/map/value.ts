import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Map - value", function () {
  test("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").properties().value().toList();

    expect(result.length).toEqual(4);
  });
});
