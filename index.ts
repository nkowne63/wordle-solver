export { next } from "./lib/information-maximum";
export { words } from "./lib/words";
export { statusFilters as filter } from "./lib/utils";

console.log(`
var list = w.words;
w.next(list);
var list = w.filter(list, "", "");
`);
