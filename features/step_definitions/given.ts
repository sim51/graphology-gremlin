import { Given } from "@cucumber/cucumber";
import graphml from "graphology-graphml";
import Graph from "graphology";

import { readFile } from "../../test/utils";
import { CustomWorld } from "../customWorld";

Given("the modern graph", async function (this: CustomWorld) {
  const graphXmlContent = await readFile(`test/assets/tinkerpop-modern.xml`);
  const graph = graphml.parse(Graph, graphXmlContent);
  this.loadGraph(graph);
});

Given("the empty graph", function (this: CustomWorld) {
  const graph = new Graph();
  this.loadGraph(graph);
});

Given("the graph initializer of", function (this: CustomWorld, docString) {
  this.traverse(docString);
});

Given("the traversal of", function (this: CustomWorld, docString: string) {
  // Write code here that turns the phrase above into concrete actions
  this.traverse(docString);
});

Given("using the parameter vid1 defined as {string}", function (this: CustomWorld, string: string) {
  this.addParameter("vid1", string);
});

Given("using the parameter vid2 defined as {string}", function (this: CustomWorld, string: string) {
  this.addParameter("vid2", string);
});

Given("using the parameter vid3 defined as {string}", function (this: CustomWorld, string: string) {
  this.addParameter("vid3", string);
});

Given("using the parameter l1 defined as {string}", function (this: CustomWorld, string: string) {
  this.addParameter("l1", string);
});

Given("using the parameter xx1 defined as {string}", function (this: CustomWorld, string: string) {
  this.addParameter("xx1", string);
});

Given("using the parameter xx2 defined as {string}", function (this: CustomWorld, string: string) {
  this.addParameter("xx2", string);
});
