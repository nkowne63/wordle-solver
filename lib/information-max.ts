import { words } from "./words";
import { word2FiveString } from "./information/enums";
import { retrievedInfos } from "./information/informations";
import { pickStrings } from "./random/picker";

export const next = (candidates: string[], count: number = 100) => {
	const answers =
		candidates.length > count ? pickStrings(candidates, count) : candidates;
	// 候補を全体の中から選ぶようにする
	const tests = [
		...(words.length > count ? pickStrings(words, count) : words),
		// candidatesが少ない場合はcandidatesも含める
		...(candidates.length > count
			? pickStrings(candidates, count)
			: candidates),
	];
	console.time("guess");
	const [information, result] = tests.reduce(
		(prevMaxPair: readonly [number, string], currentTestWord, index) => {
			const infos = answers
				.map(
					(correct) =>
						retrievedInfos(
							answers,
							word2FiveString(currentTestWord),
							word2FiveString(correct)
						).information
				)
				.filter((i) => i !== Infinity);
			const retrievedInfo =
				infos.reduce((prev, current) => prev + current, 0) / infos.length;
			const currentPair = [retrievedInfo, currentTestWord] as const;
			const newPair =
				currentPair[0] > prevMaxPair[0] ? currentPair : prevMaxPair;
			if (count >= 100 && currentPair[0] > prevMaxPair[0]) {
				console.log("percentage", (100 * index) / tests.length);
				console.log("new max info", newPair[0]);
				console.log("new max word", newPair[1]);
			}
			return newPair;
		},
		[0, ""]
	);
	console.timeEnd("guess");
	console.log("infomation:", information);
	console.log("result:", result);
	return result;
};
