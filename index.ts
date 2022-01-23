export { pickUpInformationMaximum } from "./lib/information-maximum";
export { words } from "./lib/words";
export * from "./lib/utils";

console.log(`
import * as wordle from './index'

var list = wordle.words;
var next = wordle.pickUpInformationMaximum(list, 100);
var list = wordle.statusFilters(list, next, status);
`);
