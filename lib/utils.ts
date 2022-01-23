import { CharactersType } from "./information/enums";
import { Status } from "./information/enums";
import { wordFilters } from "./information/filters";
const SimpleStatus = {
	green: "g",
	yellow: "y",
	grey: "_",
} as const;

export const statusFilters = (
	words: string[],
	word: string,
	status: string
) => {
	const conditions = status.split("").map((s, position) => {
		if (word.split("").indexOf(word[position]) !== position) {
			// 2回目以降の出現は注意する必要がある
			switch (s) {
				case SimpleStatus.yellow:
					return (target: string) =>
						target.split("").filter((c) => c === word[position]).length > 1;
				case SimpleStatus.grey:
					return (target: string) =>
						target.split("").filter((c) => c === word[position]).length === 1;
				default:
					return () => true;
			}
		}
		switch (s) {
			case SimpleStatus.green:
				return wordFilters[Status.Correct](
					word[position] as CharactersType,
					position
				);
			case SimpleStatus.yellow:
				return wordFilters[Status.WrongPosition](
					word[position] as CharactersType,
					position
				);
			case SimpleStatus.grey:
				return wordFilters[Status.NotIn](word[position] as CharactersType);
			default:
				throw new Error("Unknown status");
		}
	});
	return conditions.reduce((list, current) => list.filter(current), words);
};
