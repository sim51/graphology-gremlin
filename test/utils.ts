import Graph, { MultiDirectedGraph } from "graphology";
import { erdosRenyi } from "graphology-generators/random";
import { faker } from "@faker-js/faker";
import { promises as fsp } from "fs";

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
      name: faker.name.fullName(),
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

/**
 * read a file and returns its content as a string.
 */
export async function readFile(file: string): Promise<string> {
  const content = await fsp.readFile(file, { encoding: "utf8" });
  return content;
}
