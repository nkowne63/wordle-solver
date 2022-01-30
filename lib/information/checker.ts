import { assertsFive } from "../utils";
import {
	FiveStringType,
	FiveStringStatusType,
	Status,
	CharAndStatusType,
	CharactersType,
	characters,
} from "./enums";

export const checker = (
	word: FiveStringType,
	correct: FiveStringType
): FiveStringStatusType => {
	const { status } = word.reduce(
		(temp, char, index) => {
			const { status, charCount } = temp;
			const correctCharCount = correct.filter((c) => c === char).length;
			const currentCharCount = charCount[char];
			if (char === correct[index]) {
				return {
					status: [...status, { char, status: Status.Correct }],
					charCount: { ...charCount, [char]: currentCharCount + 1 },
				};
			} else if (!correct.includes(char)) {
				return {
					status: [...status, { char, status: Status.NotIn }],
					charCount: { ...charCount, [char]: currentCharCount + 1 },
				};
			} else if (currentCharCount < correctCharCount) {
				return {
					status: [...status, { char, status: Status.WrongPosition }],
					charCount: { ...charCount, [char]: currentCharCount + 1 },
				};
			} else {
				return {
					status: [...status, { char, status: Status.NotIn }],
					charCount: { ...charCount, [char]: currentCharCount + 1 },
				};
			}
		},
		{
			status: [] as CharAndStatusType[],
			charCount: Object.fromEntries(characters.map((c) => [c, 0] as const)) as {
				[c in CharactersType]: number;
			},
		}
	);
	assertsFive(status);
	return status;
};
