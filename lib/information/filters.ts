import { Status, CharactersType } from "./enums";

export const AdditionalStatus = {
	DoubleWrong: "doubleWrong",
} as const;

export const wordFilters = {
	[Status.WrongPosition]:
		(char: CharactersType, position: number) => (word: string) =>
			word.includes(char) && word[position] !== char,
	[Status.NotIn]: (char: CharactersType) => (word: string) =>
		!word.includes(char),
	[Status.Correct]:
		(char: CharactersType, position: number) => (word: string) =>
			word[position] === char,
	[AdditionalStatus.DoubleWrong]:
		(char: CharactersType, count: number) => (word: string) =>
			word.split("").filter((c) => c === char).length === count,
};
