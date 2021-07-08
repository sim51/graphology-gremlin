"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphTraversal = void 0;
const hasId_1 = require("../step/filter/hasId");
const hasKey_1 = require("../step/filter/hasKey");
const hasLabel_1 = require("../step/filter/hasLabel");
const hasNot_1 = require("../step/filter/hasNot");
const properties_1 = require("../step/map/properties");
const identity_1 = require("../step/map/identity");
const count_1 = require("../step/map/reducingBarrier/count");
const fold_1 = require("../step/map/reducingBarrier/fold");
const both_1 = require("../step/flatMap/both");
const bothE_1 = require("../step/flatMap/bothE");
const bothV_1 = require("../step/flatMap/bothV");
const in_1 = require("../step/flatMap/in");
const inE_1 = require("../step/flatMap/inE");
const inV_1 = require("../step/flatMap/inV");
const out_1 = require("../step/flatMap/out");
const outE_1 = require("../step/flatMap/outE");
const outV_1 = require("../step/flatMap/outV");
const otherV_1 = require("../step/flatMap/otherV");
class GraphTraversal {
    constructor(graph, config, start, steps = []) {
        this.steps = [];
        this.target = null;
        this.graph = graph;
        this.config = config;
        this.start = start;
        this.steps = steps;
    }
    next() {
        return this.getTarget().next();
    }
    addStep(step) {
        return new GraphTraversal(this.graph, this.config, this.start, this.steps.concat(step));
    }
    getGraph() {
        return this.graph;
    }
    getConfig() {
        return this.config;
    }
    getTarget() {
        if (this.target === null) {
            let target = this.start;
            this.steps.forEach((step) => {
                step.addStart(target);
                target = step;
            });
            this.target = target;
        }
        return this.target;
    }
    hasId(...keys) {
        return this.addStep(new hasId_1.HasIdStep(this, keys));
    }
    hasKey(...keys) {
        return this.addStep(new hasKey_1.HasKeyStep(this, keys));
    }
    hasLabel(...labels) {
        return this.addStep(new hasLabel_1.HasLabelStep(this, labels));
    }
    hasNot(...keys) {
        return this.addStep(new hasNot_1.HasNotStep(this, keys));
    }
    properties(...properties) {
        return this.addStep(new properties_1.PropertiesStep(this, properties));
    }
    identity() {
        return this.addStep(new identity_1.IdentityStep(this));
    }
    count() {
        return this.addStep(new count_1.CountStep(this));
    }
    fold() {
        return this.addStep(new fold_1.FoldStep(this));
    }
    otherV() {
        return this.addStep(new otherV_1.OtherVStep(this));
    }
    both(...labels) {
        return this.addStep(new both_1.BothStep(this, labels));
    }
    bothE(...labels) {
        return this.addStep(new bothE_1.BothEStep(this, labels));
    }
    bothV() {
        return this.addStep(new bothV_1.BothVStep(this));
    }
    in(...labels) {
        return this.addStep(new in_1.InStep(this, labels));
    }
    inE(...labels) {
        return this.addStep(new inE_1.InEStep(this, labels));
    }
    inV() {
        return this.addStep(new inV_1.InVStep(this));
    }
    out(...labels) {
        return this.addStep(new out_1.OutStep(this, labels));
    }
    outE(...labels) {
        return this.addStep(new outE_1.OutEStep(this, labels));
    }
    outV() {
        return this.addStep(new outV_1.OutVStep(this));
    }
    toList() {
        const result = [];
        let ir = this.next();
        while (!ir.done) {
            result.push(ir.value.value);
            ir = this.next();
        }
        return result;
    }
    toSet() {
        const result = new Set();
        let ir = this.next();
        while (!ir.done) {
            result.add(ir.value.value);
            ir = this.next();
        }
        return result;
    }
    explain() {
        throw new Error("Not implemented");
    }
}
exports.GraphTraversal = GraphTraversal;
//# sourceMappingURL=graphTraversal.js.map