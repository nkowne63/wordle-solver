export const pickStrings = (words: string[], count: number) =>
	Array.from(
		{ length: count },
		() => words[Math.floor(Math.random() * words.length)]
	);
