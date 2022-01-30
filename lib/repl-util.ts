import {
	CharactersType,
	FiveStringStatusType,
	Status,
} from "./information/enums";
import { filter } from "./information/informations";

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
	const serializedStatus = status
		.split("")
		.map((s) => {
			switch (s) {
				case SimpleStatus.green:
					return Status.Correct;
				case SimpleStatus.yellow:
					return Status.WrongPosition;
				case SimpleStatus.grey:
					return Status.NotIn;
				default:
					throw new Error("invalid status");
			}
		})
		.map((s, position) => ({
			char: word[position] as CharactersType,
			status: s,
		})) as FiveStringStatusType;
	const afterWords = filter(words, serializedStatus);
	console.log(`count: ${words.length} -> ${afterWords.length}`);
	console.log(`infor: ${Math.log2(words.length / afterWords.length)}`);
	return afterWords;
};
