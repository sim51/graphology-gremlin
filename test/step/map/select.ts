import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";
import { Values, Vertex } from "../../../src/types";

const graph = generateRandomGraph();

describe("Step - Map - as/select", function () {
  it("should work with full as/Select", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").as("vertex").properties().key().as("prop").select("vertex", "prop").toList();

    assert.equal(result.length, 4);
    result.forEach((row: Values) => {
      assert.equal(row.vertex instanceof Vertex, true);
      assert.equal(["age", "email", "name", "valid"].includes(row.prop as string), true);
    });
  });

  it("should work with partial as/Select", () => {
    const g = new GraphTraversalSource(graph);
    const result = g.V("1").as("vertex").properties().key().as("prop").select("prop").toList();

    assert.equal(result.length, 4);
    result.forEach((row: Values) => {
      assert.equal(["age", "email", "name", "valid"].includes(row.prop as string), true);
    });
  });
});
