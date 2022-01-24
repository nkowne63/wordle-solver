import { word2FiveString } from "./information/enums";
import { retrievedInfos } from "./information/informations";
import { pickStrings } from "./random/picker";

export const pickUpInformationMaximum = (words: string[], count: number) => {
	const answers = pickStrings(words, count);
	const tests = pickStrings(words, count);
	console.time("guess");
	const result = tests.reduce(
		(prevMaxPair: readonly [number, string], currentTestWord) => {
			const retrievedInfo =
				answers
					.map(
						(correct) =>
							retrievedInfos(
								answers,
								word2FiveString(currentTestWord),
								word2FiveString(correct)
							).information
					)
					.reduce((prev, current) => prev + current, 0) / count;
			const currentPair = [retrievedInfo, currentTestWord] as const;
			return currentPair[0] > prevMaxPair[0] ? currentPair : prevMaxPair;
		},
		[0, ""]
	)[1];
	console.timeEnd("guess");
	return result;
};
