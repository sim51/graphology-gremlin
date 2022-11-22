import { When } from "@cucumber/cucumber";

import { CustomWorld } from "../customWorld";

When("iterated to list", function (this: CustomWorld) {
  if (!this.graphTraversal) throw new Error("no graph travsersal found");
  this.result = this.graphTraversal.toList();
});
