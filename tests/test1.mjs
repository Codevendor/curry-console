import { curryConsole, COLOR, LABEL } from "../index.mjs";

const log = new curryConsole(true);

//console.log('test');
console.log()('Test');
console.log(LABEL.BG_GREEN)('TESTING')('Test');
//console.log(LABEL.GREEN, COLOR.GREEN)('Test')    // No return because missing ()
console.log(LABEL.RED, COLOR.GREEN)('Test')();
console.log(LABEL.RED, COLOR.GREEN)('Test')('Testing');
console.log(LABEL.BG_RED, LABEL.FG_WHITE, COLOR.GREEN)('Test')('Testing');
console.log(LABEL.BG_RED, LABEL.FG_WHITE, COLOR.GREEN)('Test', '1234')('Testing');
//console.info(COLOR.DEFAULT, COLOR.BLINK)('HELPER')
//console.info(COLOR.DEFAULT, COLOR.BLINK)('HELPER')('Hey whats up');