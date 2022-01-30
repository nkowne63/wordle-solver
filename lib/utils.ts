// https://github.com/microsoft/TypeScript/issues/41047#issuecomment-706752079
export const assertsFive: <T>(a: T[]) => asserts a is [T, T, T, T, T] = (
	array
) => {
	if (array.length !== 5)
		throw new Error("assertsFive: Array must have 5 elements");
};
