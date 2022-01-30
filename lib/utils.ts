// https://github.com/microsoft/TypeScript/issues/41047#issuecomment-706752079
export const assertsFive: <T>(a: T[]) => asserts a is [T, T, T, T, T] = (
	array
) => {
	if (array.length !== 5)
		throw new Error("assertsFive: Array must have 5 elements");
};

export const structuredEqual = <T>(a: T, b: T): boolean => {
	if (a === b) {
		return true;
	} else if (Array.isArray(a) && Array.isArray(b)) {
		return a.length === b.length && a.every((v, i) => structuredEqual(v, b[i]));
	} else if (typeof a === "object" && typeof b === "object") {
		return structuredEqual(Object.entries(a), Object.entries(b));
	}
	return false;
};
