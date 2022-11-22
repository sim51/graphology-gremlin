import assert from "assert";
import { Then } from "@cucumber/cucumber";

import { CustomWorld } from "../customWorld";

Then("the result should be unordered", function (this: CustomWorld, dataTable) {
  assert.deepEqual(this.result, dataTable);
});

Then("the result should be empty", function (this: CustomWorld) {
  assert.equal(this.result ? this.result.length : 0, 0);
});
