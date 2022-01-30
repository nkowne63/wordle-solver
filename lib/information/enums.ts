export const characters = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
] as const;

export type CharactersType = typeof characters[number];

export const Status = {
	// gray
	NotIn: "NotIn",
	// yellow
	WrongPosition: "WrongPosition",
	// green
	Correct: "Correct",
	// not filled,
	Undefined: "Undefined",
} as const;

type StatusType = typeof Status[keyof typeof Status];

export type KeyBoardStatusType = {
	[key in CharactersType]: StatusType;
};

export const initialKeyboardState = () =>
	Object.fromEntries(
		characters.map((c) => [c, Status.Undefined] as const)
	) as KeyBoardStatusType;

export type FiveStringType = [
	CharactersType,
	CharactersType,
	CharactersType,
	CharactersType,
	CharactersType
];

type CharStatusType = Exclude<StatusType, typeof Status.Undefined>;

export type CharAndStatusType = {
	char: CharactersType;
	status: CharStatusType;
};

export type FiveStringStatusType = [
	CharAndStatusType,
	CharAndStatusType,
	CharAndStatusType,
	CharAndStatusType,
	CharAndStatusType
];

export const word2FiveString = (word: string): FiveStringType => {
	const chars = word
		.split("")
		.filter((c): c is CharactersType =>
			(characters as readonly string[]).includes(c)
		);
	return [chars[0], chars[1], chars[2], chars[3], chars[4]];
};

export const fiveStringToWord = (fiveString: FiveStringType): string =>
	fiveString.join("");
