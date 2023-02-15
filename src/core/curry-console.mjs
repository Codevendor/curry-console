'use strict';

// Imports
import { COLOR } from "./color.mjs";
import { LABEL } from "./label.mjs";

/**
 * Adds color features to console, without changing standard functionality.
 */
export class curryConsole {

    #session = [];
    #verbose = false;
    #profile = false;

    #utcPrev = 0;

    #oldInfo = null;
    #oldLog = null;
    #oldWarn = null;
    #oldError = null;
    #oldTrace = null;
    #oldDebug = null;

    /** Returns the session. */
    get session() { return this.#session; }

    get verbose() { return this.#verbose; }
    set verbose(value) { this.#verbose = value; }

    constructor(profile = false, verbose = true) {

        this.#session = [];
        this.#verbose = verbose;
        this.#profile = profile;

        // Backup original methods
        this.#oldLog = console.log;
        this.#oldInfo = console.info;
        this.#oldWarn = console.warn;
        this.#oldError = console.error;
        this.#oldTrace = console.trace;
        this.#oldDebug = console.debug;

        // Attach new events
        /*
                console.log = this.#log.bind(this);
                console.info = this.#info.bind(this);
                console.warn = this.#warn.bind(this);
                console.error = this.#error.bind(this);
                console.trace = this.#trace.bind(this);
                console.debug = this.#debug.bind(this);
        */

        const self = this;

        // Log Curry
        console.log = (...a) => {

            if (a.length === 0 || a[0]?.type === 'curryConsoleType') {

                // Check for label
                const found = a.find(item => item.name === 'labelObject');
                if (found) {
                    return (...b) => {
                        return (...c) => {
                            self.#log(a, b, c);
                        };
                    };
                } else {
                    return (...b) => {
                        self.#log(a, b);
                    };
                }

            }

            self.#oldLog(...a);

        };

        // Log info
        console.info = (...x) => {

            if (x.length === 0 || (x.length > 0 && x[0].name === 'colorObject')) {
                return (y) => {
                    return (...z) => {
                        self.#info(x, y, z);
                    }
                }
            }

            self.#oldInfo(...x);

        };

        // Log warn
        console.warn = (...x) => {

            if (x.length === 0 || (x.length > 0 && x[0].name === 'colorObject')) {
                return (y) => {
                    return (...z) => {
                        self.#warn(x, y, z);
                    }
                }
            }

            self.#oldWarn(...x);

        };

        // Log error
        console.error = (...x) => {

            if (x.length === 0 || (x.length > 0 && x[0].name === 'colorObject')) {
                return (y) => {
                    return (...z) => {
                        self.#error(x, y, z);
                    }
                }
            }

            self.#oldError(...x);

        };

        // Log trace
        console.trace = (...x) => {

            if (x.length === 0 || (x.length > 0 && x[0].name === 'colorObject')) {
                return (y) => {
                    return (...z) => {
                        self.#trace(x, y, z);
                    }
                }
            }

            self.#oldTrace(...x);

        };

        // Log debug
        console.debug = (...x) => {

            if (x.length === 0 || (x.length > 0 && x[0].name === 'colorObject')) {
                return (y) => {
                    return (...z) => {
                        self.#debug(x, y, z);
                    }
                }
            }

            self.#oldDebug(...x);

        };

    }

    /** Resets the session. */
    reset() {
        this.#session = [];
    }

    /**
     * Calculates the milliseconds into shorthand string.
     * @param {number} ms - The milliseconds to caculate into shorthand string.
     * @returns {string} - The shorthand string.
     */
    #calculate_time(ms) {

        // Check types
        //const ms_type = helpers.expect(this.#calculate_time, 1, ms, ['number']);

        let ms2 = ((ms % 1000) / 100).toString().split('.');
        ms2 = (ms2.length > 1) ? ms2[1] : ms2[0];
        const secs = Math.floor((ms / 1000) % 60);

        return `+${secs}.${ms2}ms`;

    }

    /**
     * Calculates a profile time.
     * @returns {number} - Returns a number of difference since last log.
     */
    #profiler() {

        let diff;

        // Create date
        const utc = new Date();

        // Calculate previous date
        const curr = Number(utc);
        diff = curr - this.#utcPrev;

        // Store new utc
        this.#utcPrev = curr;

        return diff;

    }

    /**
     * Writes the message to terminal.
     * @param {*} method 
     * @param {*} obj 
     * @param {*} message 
     */
    #write(method, obj, ...message) {

        // Add to session
        this.#session.push({ method: method.name, message: message });

        // Check if quiet mode
        if (!this.#verbose) return;

        // Call internal method to display message.
        method(...message);
    }

    /**
     * Displays the message to the console.
     * @param {*} method - The method called.
     * @param {*} obj - The object for writing.
     */
    #display(method, obj) {

        if (!this.#verbose) return;

        const diff = this.#calculate_time(obj.diff);

        switch (method.name) {

            case 'info':

                if (obj.colors.length === 1 && obj.colors[0].toString() === '') {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_CYAN + COLOR.FG_BLACK + ' ' + obj['label'] + ' ' + COLOR.RESET + COLOR.FG_CYAN, ...obj.args, COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                } else {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_CYAN + COLOR.FG_BLACK + ' ' + obj['label'] + ' ' + COLOR.RESET + obj.colors.join(''), ...obj.args, COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                }

                break;

            case 'warn':

                this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_YELLOW + COLOR.FG_BLACK + ' ' + obj['label'] + ' ' + COLOR.RESET + COLOR.FG_YELLOW, ...obj.args, COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                break;

            case 'error':

                if (obj.colors.length === 1 && obj.colors[0].toString() === '') {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_RED + COLOR.FG_WHITE + ' ' + obj['label'] + ' ' + COLOR.RESET + COLOR.FG_RED, ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                } else {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_RED + COLOR.FG_WHITE + ' ' + obj['label'] + ' ' + COLOR.RESET + obj.colors.join(''), ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                }

                break;

            case 'trace':

                if (obj.colors.length === 1 && obj.colors[0].toString() === '') {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_RED + COLOR.FG_WHITE + ' ' + obj['label'] + ' ' + COLOR.RESET + COLOR.FG_RED, ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                } else {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_RED + COLOR.FG_WHITE + ' ' + obj['label'] + ' ' + COLOR.RESET + obj.colors.join(''), ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                }

                break;

            case 'debug':

                if (obj.colors.length === 1 && obj.colors[0].toString() === '') {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_MAGENTA + COLOR.FG_WHITE + ' ' + obj['label'] + ' ' + COLOR.RESET + COLOR.FG_MAGENTA, ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                } else {
                    this.#write(method, obj, ' ' + COLOR.RESET + COLOR.BG_MAGENTA + COLOR.FG_WHITE + ' ' + obj['label'] + ' ' + COLOR.RESET + obj.colors.join(''), ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                }

                break;

            case 'log':

                if (obj.colors.length === 1 && obj.colors[0].toString() === '') {
                    this.#write(method, obj, COLOR.RESET + COLOR.FG_BLUE, ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                } else {
                    this.#write(method, obj, COLOR.RESET + obj.colors.join(''), ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);
                }

                break;

            default:

                this.#write(method, obj, ...obj.args);
                break;

        }

    }

    /** Writes log to console if verbose is true. */
    #log() {

        // Check for profile
        let prof = '';
        let diff = 0;
        let diffString = '';
        if (this.#profile) {
            diff = this.#profiler();
            diffString = this.#calculate_time(diff);
            prof = COLOR.RESET + COLOR.DIM + COLOR.WHITE + diffString + COLOR.RESET;
        }

        // Write to session

        // Check if writing to session only.
        if (!this.#verbose) return;

        // Check type
        if (arguments.length == 2) {

            // Filter just colorObjects
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Standard
            this.#oldLog(colors, ...arguments[1], prof);
            //this.#write(this.#oldLog, obj, ' ' + COLOR.RESET + COLOR.BG_MAGENTA + COLOR.FG_WHITE + ' ' + obj['label'] + ' ' + COLOR.RESET + COLOR.FG_MAGENTA, ...obj.args, COLOR.RESET + COLOR.DIM + COLOR.FG_WHITE + diff + COLOR.RESET);

        } else {

            // Filter just colorObjects
            const labelColors = LABEL.RESET + arguments[0].filter(item => item.name === 'labelObject').join('');
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Label + Standard
            this.#oldLog(labelColors, ...arguments[1], colors, ...arguments[2], prof);
        }

    }

    /** Writes info to console if verbose is true. */
    #info(colors, label, args) {
        const obj = this.#profiler('info', colors, label, args);
        this.#display(this.#oldInfo, obj);
    }

    /** Writes warn to console if verbose is true. */
    #warn(colors, label, args) {
        const obj = this.#profiler('warn', colors, label, args);
        this.#display(this.#oldWarn, obj);
    }

    /** Writes error to console if verbose is true. */
    #error(colors, label, args) {
        const obj = this.#profiler('error', colors, label, args);
        this.#display(this.#oldError, obj);
    }

    /** Writes debug to console if verbose is true. */
    #debug(colors, label, args) {
        const obj = this.#profiler('debug', colors, label, args);
        this.#display(this.#oldDebug, obj);
    }

    /** Writes trace to console if verbose is true. */
    #trace(colors, label, args) {
        const obj = this.#profiler('trace', colors, label, args);
        this.#display(this.#oldTrace, obj);
    }

}