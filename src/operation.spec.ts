import { expect } from "chai";
import {Operation} from './operation'

describe("Operation", () => {
  const s = "abcdefg";
  const op1 = new Operation([{ skip: 1 }, { insert: "FOO" }]);
  const op2 = new Operation([{ skip: 3 }, { insert: "BAR" }]);
  const op3 = new Operation([{ skip: 2 }, { insert: "BAR" }]);

  it("should apply an operation correctly", () => {
    expect(op1.apply(s)).to.equal("aFOObcdefg");
    expect(op2.apply(s)).to.equal("abcBARdefg");
  });

  it("should combine two operations correctly", () => {
    const combined1 = Operation.combine(op1, op3);
    expect(combined1.apply(s)).to.equal("aFOObcBARdefg");

    const combined2 = Operation.combine(op3, op1);
    expect(combined2.apply(s)).to.equal("abBARcFOOdefg");
  });
});