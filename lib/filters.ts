import { Status, CharactersType } from "./enums";

export const filters = {
	[Status.WrongPosition]:
		(char: CharactersType, position: number) => (word: string) =>
			word[position] !== char,
	[Status.NotIn]: (char: CharactersType) => (word: string) =>
		!word.includes(char),
	[Status.Correct]:
		(char: CharactersType, position: number) => (word: string) =>
			word[position] === char,
};
