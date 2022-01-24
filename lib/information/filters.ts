import { Status, CharactersType } from "./enums";

export const AdditionalStatus = {
	DoubleWrong: "doubleWrong",
} as const;

export const wordFilters = {
	[Status.WrongPosition]:
		(char: CharactersType, position: number) => (word: string) =>
			word[position] !== char && word.includes(char),
	[Status.NotIn]: (char: CharactersType) => (word: string) =>
		!word.includes(char),
	[Status.Correct]:
		(char: CharactersType, position: number) => (word: string) =>
			word[position] === char,
	[AdditionalStatus.DoubleWrong]:
		(char: CharactersType, position: number, count: number) => (word: string) =>
			wordFilters[Status.WrongPosition](char, position)(word) &&
			word.split("").filter((c) => c === char).length === count,
};
