import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { updateGraphKeys } from "graphology-utils";
import Graph from "graphology";
import { get, tail } from "lodash";

import { GraphTraversal } from "../src/traversal/graphTraversal";
import { GraphTraversalSource } from "../src/traversal/graphTraversalSource";

function updateNodeId(key: string, attrs: { [key: string]: any }): string {
  return `${attrs["name"] || key}`;
}

function updateEdgeId(
  _key: string,
  attributes: { [key: string]: any },
  source: string,
  target: string,
  sourceAttributes: { [key: string]: any },
  targetAttributes: { [key: string]: any },
  _undirected: boolean,
): string {
  return `${updateNodeId(source, sourceAttributes)}-${attributes["labelE"] || ""}->${updateNodeId(
    target,
    targetAttributes,
  )}`;
}

export class CustomWorld extends World {
  // some indices
  e: { [id: string]: { id: string } & { [key: string]: unknown } } = {};
  v: { [id: string]: { id: string } & { [key: string]: unknown } } = {};
  g?: GraphTraversalSource;
  graphTraversal?: GraphTraversal<unknown, unknown>;
  params?: { [key: string]: any };
  result?: Array<any>;

  constructor(options: IWorldOptions) {
    super(options);
  }

  loadGraph(graph: Graph) {
    // we update the graph ids to have name instead of id
    const nGraph = updateGraphKeys(graph, updateNodeId, updateEdgeId);
    this.g = new GraphTraversalSource(nGraph);
    this.g.with("vertex_label_field", "labelV").with("edge_label_field", "labelE");

    // populate indices
    this.e = nGraph.reduceEdges((acc, edge, attrs) => ({ ...acc, [edge]: { id: edge, ...attrs } }), {});
    this.v = nGraph.reduceNodes((acc, node, attrs) => ({ ...acc, [node]: { id: node, ...attrs } }), {});
  }

  addParameter(key: string, value: string) {
    if (!this.params) this.params = {};
    this.params[key] = this.parseStringExpression(value);
  }

  traverse(query: string) {
    const script = `
      ${Object.keys(this.params || {})
        .map((key) => `const ${key} = ${JSON.stringify((this.params || {})[key])};`)
        .join("\n")}
      this.${query};
    `;
    console.log(script);
    this.graphTraversal = eval(script);
  }

  private parseStringExpression(value: string): unknown {
    // see https://github.com/apache/tinkerpop/blob/master/gremlin-test/src/main/java/org/apache/tinkerpop/gremlin/features/StepDefinition.java
    const parsers: Array<{ name: string; regex: RegExp; fn: (...args: any[]) => unknown }> = [
      // v[]
      { name: "get node ID string", regex: /v\[(.+)\]\.sid/, fn: (id) => get(this.v[id], ["id"]) },
      { name: "get node ID", regex: /v\[(.+)\]\.id/, fn: (id) => get(this.v[id], ["id"]) },
      { name: "get node by ID", regex: /v\[(.+)\]/, fn: (id) => this.v[id] },
      // e[]
      { name: "get edge ID string", regex: /e\[(.+)\]\.sid/, fn: (id) => get(this.e[id], ["id"]) },
      { name: "get edge ID", regex: /e\[(.+)\]\.id/, fn: (id) => get(this.e[id], ["id"]) },
      { name: "get edge by ID", regex: /e\[(.+)\]/, fn: (id) => this.e[id] },
      // d[]
      { name: "NaN", regex: /d\[NaN\]/, fn: () => NaN },
      { name: "Infinity", regex: /d\[Infinity\]/, fn: () => Infinity },
      { name: "-Infinity", regex: /d\[-Infinity\]/, fn: () => -Infinity },
      { name: "number", regex: /d\[(.+)]\../, fn: (n) => +n },
    ];

    for (let parser of parsers) {
      if (value.match(parser.regex)) {
        const found = value.match(parser.regex);
        return parser.fn(...tail(found));
      }
    }
    throw new Error("Expresssion unparsable");
  }
}

setWorldConstructor(CustomWorld);
