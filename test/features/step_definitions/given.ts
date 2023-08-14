import { Given } from "@cucumber/cucumber";
import graphml from "graphology-graphml";
import Graph from "graphology";

import { NotImplemented } from "../../../src/types";
import { readFile } from "../../unit/utils";
import { CustomWorld } from "../customWorld";

Given("the {word} graph", async function (this: CustomWorld, name: string) {
  if (name !== "empty") {
    const filename = name === "grateful" ? `test/data/grateful-dead.xml` : `test/data/tinkerpop-${name}.xml`;
    const graphXmlContent = await readFile(filename);
    const graph = graphml.parse(Graph, graphXmlContent);
    this.loadGraph(graph);
  } else {
    this.loadGraph(new Graph());
  }
});

Given("the graph initializer of", function (this: CustomWorld, docString) {
  try {
    this.traverse(docString);
  } catch (e) {
    if (e instanceof NotImplemented) return "pending";
  }
  return;
});

Given("the traversal of", function (this: CustomWorld, docString: string) {
  // Write code here that turns the phrase above into concrete actions
  try {
    this.traverse(docString);
  } catch (e) {
    if (e instanceof NotImplemented) return "pending";
  }
  return;
});

Given("using the parameter {word} defined as {string}", function (this: CustomWorld, name: string, value: string) {
  this.addParameter(name, value);
});

Given("using the parameter {word} of P.neq\\({string})", function (this: CustomWorld, name: string, value: string) {
  // Write code here that turns the phrase above into concrete actions
  console.log(name, value);
  return "pending";
});

Given("using the parameter {word} of P.within\\({string})", function (this: CustomWorld, name: string, value: string) {
  // Write code here that turns the phrase above into concrete actions
  console.log(name, value);
  return "pending";
});

Given("using the parameter {word} of P.without\\({string})", function (this: CustomWorld, name: string, value: string) {
  // Write code here that turns the phrase above into concrete actions
  console.log(name, value);
  return "pending";
});

Given("an unsupported test", function (this: CustomWorld) {
  // Nothing to do here
});
