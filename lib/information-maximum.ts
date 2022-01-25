import { words } from "./words";
import { word2FiveString } from "./information/enums";
import { retrievedInfos } from "./information/informations";
import { pickStrings } from "./random/picker";

export const next = (candidates: string[], count: number = 100) => {
	const answers =
		candidates.length > count ? pickStrings(candidates, count) : candidates;
	// 候補を全体の中から選ぶようにする
	const tests = [
		...pickStrings(words, count),
		// candidatesが少ない場合はcandidatesも含める
		...(candidates.length > count ? pickStrings(words, count) : candidates),
	];
	console.time("guess");
	const [information, result] = tests.reduce(
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
					.filter((i) => i !== Infinity)
					.reduce((prev, current) => prev + current, 0) / count;
			const currentPair = [retrievedInfo, currentTestWord] as const;
			return currentPair[0] > prevMaxPair[0] ? currentPair : prevMaxPair;
		},
		[0, ""]
	);
	console.timeEnd("guess");
	console.log("infomation:", information);
	console.log("result:", result);
	return result;
};
