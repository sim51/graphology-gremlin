import { faker } from "@faker-js/faker";
import Graph, { MultiDirectedGraph } from "graphology";
import { erdosRenyi } from "graphology-generators/random";

const NODE_LABELS = ["Man", "Woman", "Other"];
const EDGE_TYPES = ["KNOWS", "FRIEND_OF", "COLLEAGUE_OF"];
const randomValue = (list: Array<string>): string => {
  return list[Math.floor(Math.random() * list.length)];
};

export function generateRandomGraph(): Graph {
  const graph: Graph = erdosRenyi(MultiDirectedGraph, { order: 100, probability: 0.5 });

  graph.nodes().forEach((nodeKey: string) => {
    graph.mergeNodeAttributes(nodeKey, {
      "@labels": ["Person", randomValue(NODE_LABELS)],
      age: Math.floor(Math.random() * 100),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      valid: faker.datatype.boolean(),
    });
  });
  graph.edges().forEach((edgeKey: string) => {
    graph.mergeEdgeAttributes(edgeKey, {
      "@type": randomValue(EDGE_TYPES),
      weight: Math.floor(Math.random() * 10),
      timestamp: new Date().getTime(),
    });
  });
  return graph;
}
