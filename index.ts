export { next } from "./lib/information-maximum";
export { words } from "./lib/words";
export { statusFilters as filter } from "./lib/repl-util";

console.log(`
var list = w.words;
w.next(list);
list = w.filter(list, "", "");
`);
