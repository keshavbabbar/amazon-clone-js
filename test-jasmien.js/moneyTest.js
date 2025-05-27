import { formatCurrency } from "../script/utils/money.js";

describe("Test suit: formatCurrency", () => {
    it("convert cents into dollars", () => {
      expect(formatCurrency(2095)).toEqual("20.95")  
    })

    it("working with 0", () => {
        expect(formatCurrency(0)).toEqual("0.00")
    })

    it("round up nearest cent", () => {
        expect(formatCurrency(2000.5)).toEqual("20.01")
    })
});