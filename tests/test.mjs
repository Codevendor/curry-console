// Imports
import test from "node:test";
import { curryConsole, COLOR, LABEL } from "../index.mjs";

const log = new curryConsole(true);

if (process.argv?.[1].endsWith('test.mjs')) {

    test('Standard console.log', async (t) => {
        console.log('test1');
    });

    test('Curry console.log', async (t) => {
        console.log()('test2');
    });

    test('Curry console.log with forecolor', async (t) => {
        console.log(COLOR.GREEN)('test3');
    });

    test('Curry console.log with forecolor', async (t) => {
        console.log(COLOR.GREEN)('test3');
    });

    test('Curry console.log with multi color', async (t) => {
        console.log(COLOR.YELLOW, COLOR.BG_GREEN)('test4');
    });

    test('Curry console.log with color and special code', async (t) => {
        console.log(COLOR.YELLOW, COLOR.BLINK)('test5');
    });

    test('Curry console.log with header missing curry ()', async (t) => {
        console.log(LABEL.RED)('test6-a');
    });

    test('Curry console.log with header with parenthesis', async (t) => {
        console.log(LABEL.RED)('test6-b')();
    });

    test('Curry console.log with header and text', async (t) => {
        console.log(LABEL.RED)('test7')('testing the message');
    });

    test('Curry console.log with header and background and text', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED)('test8')('testing the message');
    });

    test('Curry console.log with header and background and text and text color', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.MAGENTA)('test9')('testing the message');
    });

    test('Curry console.log with header and background and text color and background', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.BG_MAGENTA, COLOR.WHITE)('test10')('testing the message');
    });

    test('Curry console.log with header and background and text color and background and special', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE, COLOR.UNDERCORE)('test11')('http://example.com', {id: 1}, 12345, [1,2,4,5]);
    });   


}







