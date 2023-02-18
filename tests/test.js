// Imports
import test from "node:test";
import process from 'node:process';
import { curryConsole, COLOR, LABEL } from "../src/index.js";

//const curr = new curryConsole(true);
const curr = new curryConsole(true);
curr.record = true;
curr.defaultLog = [COLOR.WHITE, COLOR.BOLD];
curr.defaultLogLabel = [LABEL.WHITE, LABEL.BG_GREEN, LABEL.BOLD];

if (process.argv?.[1].endsWith('test.js')) {

    test('Event Emitter', async (t) => {

        curr.on('message', (data) => {

            process.stdout.write(`Event Emitted for ${data.type}\n`);

        });
    });

    test('Standard console.log', async (t) => {
        console.log('This should be a standard console.log(msg)');
    });

    test('Curry console.log', async (t) => {
        console.log()('This should be a console.log()(msg)');
    });

    test('Curry console.log with forecolor', async (t) => {
        console.log(COLOR.GREEN)('This should be a console.log(COLOR.GREEN)(msg)');
    });

    test('Curry console.log with multi color', async (t) => {
        console.log(COLOR.BG_WHITE, COLOR.BLACK)('This should be a multi color console.log(COLOR.BG_WHITE, COLOR.BLACK)(msg)');
    });

    test('Curry console.log with color and special code', async (t) => {
        console.log(COLOR.YELLOW, COLOR.BLINK)('This should be a color with blink console.log(COLOR.YELLOW, COLOR.BLINK)(msg)');
    });

    test('Curry console.log with label missing curry ()', async (t) => {
        console.log(LABEL.RED)('test6-a');
    });

    test('Curry console.log with label with parenthesis', async (t) => {
        console.log(LABEL.RED)('LABEL-TEST')();
    });

    test('Curry console.log with label and text', async (t) => {
        console.log(LABEL.RED, COLOR.WHITE)('TEST7')('This should be a label and text color white console.log(LABEL.RED, COLOR.WHITE)(label)(msg)');
    });

    test('Curry console.log with header and background and text', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE)('TEST8')('This should be a red label with white text and text color white console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE)(label)(msg)');
    });

    test('Curry console.log with header and background and text and text color', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.MAGENTA)('TEST9')('This should be a red label with white text and text color magenta console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.MAGENTA)(label)(msg)');
    });

    test('Curry console.log with header and background and text color and background', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.BG_MAGENTA, COLOR.WHITE)('TEST10')('This should be a red label with white text and text bg_color magenta with white text console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.BG_MAGENTA, COLOR.WHITE)(label)(msg)');
    });

    test('Curry console.log with header and background and text color and background and special', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE, COLOR.UNDERLINE)('TEST11')('This should be a red label with white text and white underlined text console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE, COLOR.UNDERCORE)(label)(msg)', 'http://example.com');
    });

    test('Curry console.log check for default color', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_BLUE, COLOR.BLUE)('TEST12')('Testing other types converted with JSON.stringify', { id: 1 }, 12345, [1, 2, 4, 5]);
    });

    test('Curry console.log check for label default color', async (t) => {
        console.log(LABEL.DEFAULT)('TEST13')(`These should be default colors set for defaultLog and defaultLogLabel. console.log(LABEL.DEFAULT)('TEST13')(msg)`);
    });

    test('Color Test', async (t) => {
        console.log(COLOR.RAINBOW)('This is a rainbow colored text.', 12345, { id: "hey" });
    });

    test('Check if history', async (t) => {
        console.log('The current history...', curr.history);
    });

}









