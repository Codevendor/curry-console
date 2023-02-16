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
        console.info = (...a) => {

            if (a.length === 0 || a[0]?.type === 'curryConsoleType') {

                // Check for label
                const found = a.find(item => item.name === 'labelObject');
                if (found) {
                    return (...b) => {
                        return (...c) => {
                            self.#info(a, b, c);
                        };
                    };
                } else {
                    return (...b) => {
                        self.#info(a, b);
                    };
                }

            }

            self.#oldInfo(...a);


        };

        // Log warn
        console.warn = (...a) => {

            if (a.length === 0 || a[0]?.type === 'curryConsoleType') {

                // Check for label
                const found = a.find(item => item.name === 'labelObject');
                if (found) {
                    return (...b) => {
                        return (...c) => {
                            self.#warn(a, b, c);
                        };
                    };
                } else {
                    return (...b) => {
                        self.#warn(a, b);
                    };
                }

            }

            self.#oldWarn(...a);

        };

        // Log error
        console.error = (...a) => {

            if (a.length === 0 || a[0]?.type === 'curryConsoleType') {

                // Check for label
                const found = a.find(item => item.name === 'labelObject');
                if (found) {
                    return (...b) => {
                        return (...c) => {
                            self.#error(a, b, c);
                        };
                    };
                } else {
                    return (...b) => {
                        self.#error(a, b);
                    };
                }

            }

            self.#oldError(...a);


        };

        // Log trace
        console.trace = (...a) => {

            if (a.length === 0 || a[0]?.type === 'curryConsoleType') {

                // Check for label
                const found = a.find(item => item.name === 'labelObject');
                if (found) {
                    return (...b) => {
                        return (...c) => {
                            self.#trace(a, b, c);
                        };
                    };
                } else {
                    return (...b) => {
                        self.#trace(a, b);
                    };
                }

            }

            self.#oldTrace(...a);


        };

        // Log debug
        console.debug = (...a) => {

            if (a.length === 0 || a[0]?.type === 'curryConsoleType') {

                // Check for label
                const found = a.find(item => item.name === 'labelObject');
                if (found) {
                    return (...b) => {
                        return (...c) => {
                            self.#debug(a, b, c);
                        };
                    };
                } else {
                    return (...b) => {
                        self.#debug(a, b);
                    };
                }

            }

            self.#oldLog(...a);


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

        } else {

            // Filter just colorObjects
            const labelColors = LABEL.RESET + arguments[0].filter(item => item.name === 'labelObject').join('');
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Label + Standard
            this.#oldLog(labelColors, ...arguments[1], colors, ...arguments[2], prof);
        }

    }

    /** Writes info to console if verbose is true. */
    #info() {

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
            this.#oldInfo(colors, ...arguments[1], prof);

        } else {

            // Filter just colorObjects
            const labelColors = LABEL.RESET + arguments[0].filter(item => item.name === 'labelObject').join('');
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Label + Standard
            this.#oldInfo(labelColors, ...arguments[1], colors, ...arguments[2], prof);
        }

    }

    /** Writes warn to console if verbose is true. */
    #warn() {

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
            this.#oldWarn(colors, ...arguments[1], prof);

        } else {

            // Filter just colorObjects
            const labelColors = LABEL.RESET + arguments[0].filter(item => item.name === 'labelObject').join('');
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Label + Standard
            this.#oldWarn(labelColors, ...arguments[1], colors, ...arguments[2], prof);
        }

    }

    /** Writes error to console if verbose is true. */
    #error() {

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
            this.#oldError(colors, ...arguments[1], prof);

        } else {

            // Filter just colorObjects
            const labelColors = LABEL.RESET + arguments[0].filter(item => item.name === 'labelObject').join('');
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Label + Standard
            this.#oldError(labelColors, ...arguments[1], colors, ...arguments[2], prof);
        }


    }

    /** Writes debug to console if verbose is true. */
    #debug() {

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
            this.#oldDebug(colors, ...arguments[1], prof);

        } else {

            // Filter just colorObjects
            const labelColors = LABEL.RESET + arguments[0].filter(item => item.name === 'labelObject').join('');
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Label + Standard
            this.#oldDebug(labelColors, ...arguments[1], colors, ...arguments[2], prof);
        }


    }

    /** Writes trace to console if verbose is true. */
    #trace() {

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
            this.#oldTrace(colors, ...arguments[1], prof);

        } else {

            // Filter just colorObjects
            const labelColors = LABEL.RESET + arguments[0].filter(item => item.name === 'labelObject').join('');
            const colors = COLOR.RESET + arguments[0].filter(item => item.name === 'colorObject').join('');

            // Label + Standard
            this.#oldTrace(labelColors, ...arguments[1], colors, ...arguments[2], prof);
        }


    }

}