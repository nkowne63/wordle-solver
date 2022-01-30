import { assertsFive } from "./utils";

describe("utils", () => {
	it("assetsFive", () => {
		const n = [1, 2, 3, 4, 5];
		assertsFive(n);
		expect(n).toBe(n);
	});
});
