import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Map - key", function () {
  test("should work", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").properties().key().toList();

    expect(result).toEqual(["age", "email", "name", "valid"]);
  });
});
