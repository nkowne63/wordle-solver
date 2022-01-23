import { wordFilters } from "./filters";
import { checker } from "./checker";
import { FiveStringType, FiveStringStatusType } from "./enums";
import { words } from "../words";

const statusToConditions = (fss: FiveStringStatusType) =>
	fss.map((status, position) => {
		switch (status.status) {
			case "Correct":
				return wordFilters.Correct(status.char, position);
			case "WrongPosition":
				return wordFilters.WrongPosition(status.char, position);
			case "NotIn":
				return wordFilters.NotIn(status.char);
		}
	});

export const retrievedInfos = (
	wordList: string[],
	word: FiveStringType,
	correct: FiveStringType
) => {
	const status = checker(word, correct);
	const filterConditions = statusToConditions(status);
	const filteredWords = filterConditions.reduce(
		(list, condition) => list.filter(condition),
		words
	);
	const informations = Math.log2(wordList.length / filteredWords.length);
	return {
		informations,
		filteredWords,
	};
};
