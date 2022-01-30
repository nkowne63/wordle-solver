import { AdditionalStatus, wordFilters } from "./filters";
import { checker } from "./checker";
import {
	FiveStringType,
	FiveStringStatusType,
	CharactersType,
	CharAndStatusType,
	Status,
	word2FiveString,
} from "./enums";
import { assertsFive } from "../utils";

export const filter = (
	list: string[],
	status: FiveStringStatusType
): string[] => {
	const word = status.map((s) => s.char);
	assertsFive(word);
	const filtered = list.filter((correct) => {
		const wordStatus = checker(word, word2FiveString(correct));
		return wordStatus === status;
	});
	return filtered;
};

export const statusToConditions = (fss: FiveStringStatusType) => {
	const positionedStatus = fss.map((fs, position) => ({
		...fs,
		position,
	}));
	const chars = positionedStatus.map((fs) => fs.char);
	// 1つしか出現しない場合は楽
	const singles = positionedStatus.filter(
		(ps) => chars.filter((c) => c === ps.char).length === 1
	);
	const singlesConditions = singles.map((status) => {
		switch (status.status) {
			case Status.Correct:
				return wordFilters.Correct(status.char, status.position);
			case Status.WrongPosition:
				return wordFilters.WrongPosition(status.char, status.position);
			case Status.NotIn:
				return wordFilters.NotIn(status.char);
		}
	});
	// 問題は2つ以上ある場合
	const duals = positionedStatus.filter(
		(ps) => chars.filter((c) => c === ps.char).length > 1
	);
	const dualsCounts = duals.reduce((set, dual) => {
		if (set.map((s) => s.char).includes(dual.char)) {
			return set.map((s) =>
				s.char !== dual.char
					? s
					: {
							...s,
							statuses: [
								...s.statuses,
								{
									position: dual.position,
									status: dual.status,
								},
							],
					  }
			);
		} else {
			return [
				...set,
				{
					char: dual.char,
					statuses: [
						{
							position: dual.position,
							status: dual.status,
						},
					],
				},
			];
		}
	}, [] as { char: CharactersType; statuses: (Omit<CharAndStatusType, "char"> & { position: number })[] }[]);
	const dualsConditions = dualsCounts
		.map((dual) => {
			return dual.statuses.map((resultStatus) => {
				// 複数回黄色もしくは灰色がある場合、その場所に文字が含まれるだけでなく、文字数の情報も得られる
				const wrongFilter = wordFilters[AdditionalStatus.DoubleWrong](
					dual.char,
					// 黄色の数 + 緑色の数だけ存在する
					dual.statuses.filter(
						(s) =>
							s.status === Status.WrongPosition || s.status === Status.Correct
					).length
				);
				switch (resultStatus.status) {
					case Status.Correct:
						return wordFilters[Status.Correct](
							dual.char,
							resultStatus.position
						);
					case Status.WrongPosition:
						return (word: string) =>
							wrongFilter(word) &&
							wordFilters[Status.WrongPosition](
								dual.char,
								resultStatus.position
							)(word);
					case Status.NotIn:
						return wrongFilter;
				}
			});
		})
		.flat();
	return [...singlesConditions, ...dualsConditions];
};

export const retrievedInfos = (
	wordList: string[],
	word: FiveStringType,
	correct: FiveStringType
) => {
	const status = checker(word, correct);
	const filterConditions = statusToConditions(status);
	const filteredWords = filterConditions.reduce(
		(list, condition) => list.filter(condition),
		wordList
	);
	const information = Math.log2(wordList.length / filteredWords.length);
	return {
		information,
		filteredWords,
	};
};
