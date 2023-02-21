// Imports
import test from "node:test";
import process from 'node:process';
import { curryConsole, COLOR, LABEL, ACTION } from "../src/index.js";

//const curr = new curryConsole(true);
const curr = new curryConsole(true);
curr.record = true;
curr.profile = true;
curr.debug = true;

// Defaults for log
curr.defaultsLog = [COLOR.WHITE];

// Defaults for info
curr.defaultsInfo = [COLOR.CYAN, LABEL.BLACK, LABEL.BG_CYAN];

// Defaults for warn
curr.defaultsWarn = [COLOR.YELLOW, LABEL.BLACK, LABEL.BG_YELLOW];

// Defaults for error
curr.defaultsError = [COLOR.RED, LABEL.WHITE, LABEL.BG_RED];


//console.log("\x1b[38;5;393m▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒")

if (process.argv?.[1].endsWith('test.js')) {

// process.stdout.write("This is a loader\n");
// process.stdout.write("Progress\n");
// process.stdout.write("\n0%");
// var count = 0;
// setInterval(()=>{
//     count++;
//     process.stdout.write("\r\x1b[K");
//     process.stdout.write(`${count}% - \x1b[38;5;53m\x1b[47m▒ World - ${uuidv4()}`);
// }, 2000);


/*
    
    console.log("Message\\0o33[0K\r");
    console.log("message\\", parseInt('033',8), "[OK\r");
    console.log('Hey');
    console.log(LABEL.BG_BLUE, LABEL.WHITE, COLOR.WHITE, ACTION.DEBUG(false), ACTION.DELAY(2000))(' NODEJS ')('testing');
    console.log(ACTION.INDENT('Test -> '), LABEL.BG_BLUE, LABEL.WHITE, COLOR.WHITE)(' NODEJS ')('testing 2');
    */

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
        console.log(LABEL.RED)('LABEL-TEST');
    });

    test('Curry console.log with label and text', async (t) => {
        console.log(LABEL.RED, COLOR.WHITE)('TEST7', 'This should be a label and text color white console.log(LABEL.RED, COLOR.WHITE)(label)(msg)');
    });

    test('Curry console.log with header and background and text', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE)('TEST8', 'This should be a red label with white text and text color white console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE)(label)(msg)');
    });

    test('Curry console.log with header and background and text and text color', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.MAGENTA)('TEST9', 'This should be a red label with white text and text color magenta console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.MAGENTA)(label)(msg)');
    });

    test('Curry console.log with header and background and text color and background', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.BG_MAGENTA, COLOR.WHITE)('TEST10', 'This should be a red label with white text and text bg_color magenta with white text console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.BG_MAGENTA, COLOR.WHITE)(label)(msg)');
    });

    test('Curry console.log with header and background and text color and background and special', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE, COLOR.UNDERLINE)('TEST11', 'This should be a red label with white text and white underlined text console.log(LABEL.WHITE, LABEL.BG_RED, COLOR.WHITE, COLOR.UNDERCORE)(label)(msg)', 'http://example.com');
    });

    test('Curry console.log check for default color', async (t) => {
        console.log(LABEL.WHITE, LABEL.BG_BLUE, COLOR.BLUE)('TEST12', 'Testing other types converted with JSON.stringify', { id: 1 }, 12345, [1, 2, 4, 5]);
    });

    test('Curry console.log check for label default color', async (t) => {
        console.log(LABEL.DEFAULT)('TEST13', `These should be default colors set for defaultLog and defaultLogLabel. console.log(LABEL.DEFAULT)('TEST13')(msg)`);
    });

    test('Color Test', async (t) => {
        console.log(COLOR.RAINBOW)('This is a rainbow colored text.', 12345, { id: "hey" });
    });

    test('Test for native, where type must be curryConsoleType for first param group.', async (t) => {
        console.log( COLOR.BG_RED, 'test', COLOR.WHITE);
    });

    test('Test action indent.', async (t) => {
        console.info(LABEL.DEFAULT, ACTION.INDENT())('TEST', 'Testing indent');
    });

    test('Test action indent with string.', async (t) => {
        console.info(LABEL.DEFAULT, ACTION.INDENT('--->'))('TEST', 'Testing indent with string');
    });

    test('Check if history', async (t) => {
        console.log(`The current history... Total Item: ${curr.history.length}`);
    });

    test('Test Custom Hex Color', async (t) => {
        console.log(LABEL.HEX("#5B3300","BG"))('TESTER', 'testing custom hex color background');
    });

    test('Test Custom RGB Color', async (t) => {
        console.log(COLOR.RGB(235,80,80,"FG"))('testing custom rgb color forground');
    });

    test('Test turn off debug for this message', async (t) => {
        console.log(ACTION.DEBUG(false), COLOR.RGB(235,80,80,"FG"))('Test turn off debug for this message');
    });

    test('Test turn off profile for this message', async (t) => {
        console.log(ACTION.PROFILE(false), COLOR.RGB(235,80,80,"FG"))('Test turn off profile for this message');
    });

}

