import assert from "assert";
import { generateRandomGraph } from "../../utils";
import { GraphTraversalSource } from "../../../src/index";

const graph = generateRandomGraph();

describe("Step - Filter - hasLabel", function() {
  describe("Vertex", function() {
    it("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbPerson = g
        .V()
        .hasLabel("Person")
        .toList().length;
      assert.equal(nbPerson, 100);

      const nbMan = g
        .V()
        .hasLabel("Man")
        .toList().length;
      const nbWoman = g
        .V()
        .hasLabel("Woman")
        .toList().length;
      const nbOther = g
        .V()
        .hasLabel("Other")
        .toList().length;
      assert.equal(nbMan + nbWoman + nbOther, 100);
    });

    it("with multiple value should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbPerson = g
        .V()
        .hasLabel("Man", "Woman", "Other")
        .toList().length;
      assert.equal(nbPerson, 100);
    });

    it("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      assert.equal(
        g
          .V()
          .hasLabel()
          .toList().length,
        0,
      );
    });
  });
  describe("Edge", function() {
    it("with one value should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbKnow = g
        .E()
        .hasLabel("KNOWS")
        .toList().length;
      const nbFriend = g
        .E()
        .hasLabel("FRIEND_OF")
        .toList().length;
      const nbColleague = g
        .E()
        .hasLabel("COLLEAGUE_OF")
        .toList().length;

      assert.equal(nbKnow + nbFriend + nbColleague, graph.size);
    });

    it("with multiple values should work", () => {
      const g = new GraphTraversalSource(graph);
      const nbEdges = g
        .E()
        .hasLabel("KNOWS", "FRIEND_OF", "COLLEAGUE_OF")
        .toList().length;
      assert.equal(nbEdges, graph.size);
    });

    it("without value should returns 0 result", () => {
      const g = new GraphTraversalSource(graph);
      assert.equal(
        g
          .E()
          .hasLabel()
          .toList().length,
        0,
      );
    });
  });
});
