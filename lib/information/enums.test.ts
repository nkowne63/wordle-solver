import { assertsFive } from "../utils";
import { characters } from "./enums";

describe("characters", () => {
	it("length", () => {
		expect(characters.length).toBe(26);
	});
	it("assetsFive", () => {
		const n = [1, 2, 3, 4, 5];
		assertsFive(n);
		expect(n).toBe(n);
	});
});
