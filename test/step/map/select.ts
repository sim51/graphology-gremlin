import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { Values, Vertex } from "../../../src/types";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Map - as/select", function () {
  test("should work with full as/Select", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").as("vertex").properties().key().as("prop").select("vertex", "prop").toList();

    expect(result.length).toEqual(4);
    result.forEach((row: Values) => {
      expect(row.vertex instanceof Vertex).toBeTruthy();
      expect(["age", "email", "name", "valid"].includes(row.prop as string)).toBeTruthy();
    });
  });

  test("should work with partial as/Select", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").as("vertex").properties().key().as("prop").select("prop").toList();

    expect(result.length).toEqual(4);
    result.forEach((row: Values) => {
      expect(["age", "email", "name", "valid"].includes(row.prop as string)).toBeTruthy();
    });
  });
});
