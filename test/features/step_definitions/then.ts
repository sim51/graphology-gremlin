import assert from "assert";
import { Then } from "@cucumber/cucumber";

import { CustomWorld } from "../customWorld";

Then("the result should be unordered", function (this: CustomWorld, dataTable) {
  assert.deepEqual(this.result, this.parseDataTable(dataTable));
});

Then("the result should be ordered", function (this: CustomWorld, dataTable) {
  assert.deepEqual(this.result, this.parseDataTable(dataTable));
});

Then("the result should be of", function (this: CustomWorld, dataTable) {
  // Write code here that turns the phrase above into concrete actions
  console.log(dataTable);
  return "pending";
});

Then("the result should be empty", function (this: CustomWorld) {
  assert.equal(this.result ? this.result.length : 0, 0);
});

Then("nothing should happen because", function (this: CustomWorld, message: string) {
  // Nothing to do here, excdpt log the message
  this.log(message);
});

Then("the graph should return {int} for count of {string}", function (this: CustomWorld, count: number, query: string) {
  // the graph should return 6 for count of "g.E()"
  const rs = this.runQuery(query);
  assert.equal(rs && rs.length > 0 ? rs[0] : null, count);
});

Then("the result should have a count of {int}", function (this: CustomWorld, count: number) {
  // Then('the result should have a count of {float}', function (float) {
  // Write code here that turns the phrase above into concrete actions
  assert.equal(this.result ? this.result.length : 0, count);
});

Then("the traversal will raise an error", function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("the traversal will raise an error with message containing text of {string}", function (
  this: CustomWorld,
  message: string,
) {
  // Write code here that turns the phrase above into concrete actions
  console.log(message);
  return "pending";
});
