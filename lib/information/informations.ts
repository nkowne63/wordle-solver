import { checker } from "./checker";
import { FiveStringType, FiveStringStatusType, word2FiveString } from "./enums";
import { assertsFive, structuredEqual } from "../utils";

export const filter = (
	list: string[],
	status: FiveStringStatusType
): string[] => {
	const word = status.map((s) => s.char);
	assertsFive(word);
	const filtered = list.filter((correct) => {
		const wordStatus = checker(word, word2FiveString(correct));
		return structuredEqual(wordStatus, status);
	});
	return filtered;
};

export const retrievedInfos = (
	wordList: string[],
	word: FiveStringType,
	correct: FiveStringType
) => {
	const status = checker(word, correct);
	const filteredWords = filter(wordList, status);
	const information = Math.log2(wordList.length / filteredWords.length);
	return {
		information,
		filteredWords,
	};
};
