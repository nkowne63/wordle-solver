import { assertsFive, structuredEqual } from "./utils";

describe("utils", () => {
	it("assetsFive", () => {
		const n = [1, 2, 3, 4, 5];
		assertsFive(n);
		expect(n).toBe(n);
	});
	it("structuredEqual: equal", () => {
		expect(structuredEqual("a", "a")).toBeTruthy();
		expect(structuredEqual(0, 0)).toBeTruthy();
	});
	it("structuredEqual: not equal", () => {
		expect(structuredEqual("a", "b")).toBeFalsy();
		expect(structuredEqual(0, 1)).toBeFalsy();
	});
	it("structuredEqual: array", () => {
		expect(structuredEqual(["a"], ["a"])).toBeTruthy();
	});
	it("structuredEqual: object", () => {
		expect(structuredEqual({ a: "a" }, { a: "a" })).toBeTruthy();
	});
	it("structuredEqual: deep array", () => {
		const a = [{ a: { b: [1, 2, 3] } }, "a"];
		const b = [{ a: { b: [1, 2, 3] } }, "a"];
		expect(structuredEqual(a, b)).toBeTruthy();
	});
});
