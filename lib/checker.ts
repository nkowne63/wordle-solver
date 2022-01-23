import { FiveStringType, FiveStringStatusType, Status } from "./enums";
export const checker = (word: FiveStringType, correct: FiveStringType) =>
	word.map((c, pos) =>
		correct[pos] === c
			? { char: c, status: Status.Correct }
			: correct.includes(c)
			? { char: c, status: Status.WrongPosition }
			: { char: c, status: Status.NotIn }
	) as FiveStringStatusType;
