import { expect } from "chai";
import {Operation} from './operation'

describe("Operation", () => {
  const s = "abcdefg";
  const op1 = new Operation([{ skip: 1 }, { insert: "FOO" }]);
  const op2 = new Operation([{ skip: 3 }, { insert: "BAR" }]);
  const op3 = new Operation([{ skip: 2 }, { insert: "BAR" }]);
  const op4 = new Operation([{ skip: 3 }, { delete: 2 }]);

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

  it("should combine two operations correctly with delete operation example", () => {
    expect(op1.apply(s)).to.equal("aFOObcdefg");
    expect(op4.apply(s)).to.equal("abcfg");

    const combined1 = Operation.combine(op1, op4);
    expect(combined1.apply(s)).to.equal("aFOObcdg");

    const combined2 = Operation.combine(op4, op1);
    expect(combined2.apply(s)).to.equal("abcfFOOg");
  });
});