import { word2FiveString } from "./information/enums";
import { retrievedInfos } from "./information/informations";
import { pickString } from "./random/picker";

export const pickUpInformationMaximum = (words: string[], count: number) => {
	const answers = pickString(words, count);
	const tests = pickString(words, count);
	return tests.reduce(
		(prevMaxPair: readonly [number, string], currentTestWord) => {
			const retrievedInfo =
				answers
					.map(
						(correct) =>
							retrievedInfos(
								words,
								word2FiveString(currentTestWord),
								word2FiveString(correct)
							).informations
					)
					.reduce((prev, current) => prev + current, 0) / count;
			const currentPair = [retrievedInfo, currentTestWord] as const;
			return currentPair[0] > prevMaxPair[0] ? currentPair : prevMaxPair;
		},
		[0, ""]
	)[1];
};
