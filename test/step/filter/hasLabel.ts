import { describe, expect, test } from "vitest";

import { GraphTraversalSource } from "../../../src/index";
import { generateRandomGraph } from "../../utils";

const graph = generateRandomGraph();

describe("Step - Filter - hasLabel", function () {
  describe("Vertex", function () {
    test("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbPerson = g.V().hasLabel("Person").toList().length;
      expect(nbPerson).toEqual(100);

      const nbMan = g.V().hasLabel("Man").toList().length;
      const nbWoman = g.V().hasLabel("Woman").toList().length;
      const nbOther = g.V().hasLabel("Other").toList().length;
      expect(nbMan + nbWoman + nbOther).toEqual(100);
    });

    test("with multiple value should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbPerson = g.V().hasLabel("Man", "Woman", "Other").toList().length;
      expect(nbPerson).toEqual(100);
    });

    test("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      expect(g.V().hasLabel().toList().length).toEqual(0);
    });
  });
  describe("Edge", function () {
    test("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbKnow = g.E().hasLabel("KNOWS").toList().length;
      const nbFriend = g.E().hasLabel("FRIEND_OF").toList().length;
      const nbColleague = g.E().hasLabel("COLLEAGUE_OF").toList().length;

      expect(nbKnow + nbFriend + nbColleague).toEqual(graph.size);
    });

    test("with multiple values should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbEdges = g.E().hasLabel("KNOWS", "FRIEND_OF", "COLLEAGUE_OF").toList().length;
      expect(nbEdges).toEqual(graph.size);
    });

    test("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      expect(g.E().hasLabel().toList().length).toEqual(0);
    });
  });
});
