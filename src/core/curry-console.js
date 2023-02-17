'use strict';

// Imports
import { curryEventEmitter } from "./event-emitter.js";
import { COLOR } from "./color.js";
import { LABEL } from "./label.js";

/**
 * Adds color features to console, without changing standard functionality.
 */
export class curryConsole extends curryEventEmitter {

    #history = [];
    #profile = false;
    #verbose = false;
    #record = false;

    #utcPrev = 0;

    #standardLog = null;
    #standardInfo = null;
    #standardWarn = null;
    #standardError = null;

    #defaultLog = [];
    #defaultLogLabel = [];
    #defaultInfo = [];
    #defaultInfoLabel = [];
    #defaultWarn = [];
    #defaultWarnLabel = [];
    #defaultError = [];
    #defaultErrorLabel = [];

    /** Returns the history of the logging. */
    get history() { return this.#history; }

    /** Gets whether in profile mode and displaying profiler information. */
    get profile() { return this.#profile; }

    /**
     * Sets whether in profile mode and displaying profiler information.
     * @param {boolean} value - Whether to display profiler information in terminal.
     */
    set profile(value) { this.#profile = value; }

    /** Gets whether in verbose mode and displaying to terminal. */
    get verbose() { return this.#verbose; }

    /**
     * Sets whether in verbose mode and displaying to terminal.
     * @param {boolean} value - Whether to display to terminal.
     */
    set verbose(value) { this.#verbose = value; }

    /** Gets whether in record mode and recording all console history. */
    get record() { return this.#record; }

    /**
     * Sets whether in record mode and recording all console history.
     * @param {boolean} value - Whether to record history.
     */
    set record(value) { this.#record = value; }

    /** Gets the default color for log(). */
    get defaultLog() { return this.#defaultLog; }

    /**
     * Sets the default color for log().
     * @param {boolean} value - The default colors for log().
     */
    set defaultLog(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultLog value, must be an array of curryConsoleType(s).`);
        this.#defaultLog = value;
    }

    /** Gets the default label color for log(). */
    get defaultLogLabel() { return this.#defaultLogLabel; }

    /**
     * Sets the default label color for log().
     * @param {boolean} value - The default label colors for log().
     */
    set defaultLogLabel(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultLogLabel value, must be an array of curryConsoleType(s).`);
        this.#defaultLogLabel = value;
    }

    /** Gets the default color for info(). */
    get defaultInfo() { return this.#defaultInfo; }

    /**
     * Sets the default color for info().
     * @param {boolean} value - The default colors for info().
     */
    set defaultInfo(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultInfo value, must be an array of curryConsoleType(s).`);
        this.#defaultInfo = value;
    }

    /** Gets the default label color for info(). */
    get defaultInfoLabel() { return this.#defaultInfoLabel; }

    /**
     * Sets the default label color for info().
     * @param {boolean} value - The default label colors for info().
     */
    set defaultInfoLabel(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultInfoLabel value, must be an array of curryConsoleType(s).`);
        this.#defaultInfoLabel = value;
    }

    /** Gets the default color for warn(). */
    get defaultWarn() { return this.#defaultWarn; }

    /**
     * Sets the default color for warn().
     * @param {boolean} value - The default colors for warn().
     */
    set defaultWarn(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultWarn value, must be an array of curryConsoleType(s).`);
        this.#defaultWarn = value;
    }

    /** Gets the default label color for warn(). */
    get defaultWarnLabel() { return this.#defaultWarnLabel; }

    /**
     * Sets the default label color for warn().
     * @param {boolean} value - The default label colors for warn().
     */
    set defaultWarnLabel(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultWarnLabel value, must be an array of curryConsoleType(s).`);
        this.#defaultWarnLabel = value;
    }

    /** Gets the default color for error(). */
    get defaultError() { return this.#defaultError; }

    /**
     * Sets the default color for error().
     * @param {boolean} value - The default colors for error().
     */
    set defaultError(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultError value, must be an array of curryConsoleType(s).`);
        this.#defaultError = value;
    }

    /** Gets the default label color for error(). */
    get defaultErrorLabel() { return this.#defaultErrorLabel; }

    /**
     * Sets the default label color for error().
     * @param {boolean} value - The default label colors for error().
     */
    set defaultErrorLabel(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultErrorLabel value, must be an array of curryConsoleType(s).`);
        this.#defaultErrorLabel = value;
    }

    /**
     * The constructor for the curryConsole.
     * @param {*} profile 
     * @param {*} verbose 
     */
    constructor(profile = false, verbose = true, record = false) {

        // Extend emitter
        super();

        this.#history = [];
        this.#verbose = verbose;
        this.#profile = profile;
        this.#record = record;

        // Backup original methods
        this.#standardLog = console.log;
        this.#standardInfo = console.info;
        this.#standardWarn = console.warn;
        this.#standardError = console.error;

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

            // Emit Event
            self.emit('log', { type: 'console.log()', params: a });

            // Write to standard console.log
            self.#standardLog(...a);

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
                        self.#info([], a, b);
                    };
                }

            }

            // Emit Event
            self.emit('info', { type: 'console.info()', params: a });

            // Write to standard console.info
            self.#standardInfo(...a);


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
                        self.#warn([], a, b);
                    };
                }

            }

            // Emit Event
            self.emit('warn', { type: 'console.warn()', params: a });

            // Write to standard console.warn
            self.#standardWarn(...a);

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
                        self.#error([], a, b);
                    };
                }

            }

            // Emit Event
            self.emit('error', { type: 'console.error()', params: a });

            // Write to standard console.error
            self.#standardError(...a);

        };

    }

    /** Resets the history. */
    reset() {
        this.#history = [];
    }

    /**
     * Calculates the milliseconds into shorthand string.
     * @param {number} ms - The milliseconds to caculate into shorthand string.
     * @returns {string} - The shorthand string.
     */
    #calculate_time(ms) {

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
     * Rainbowizes text output colors.
     * @param {*} args - The arguments to merge into rainbox text.
     * @return {string} - A rainbow text string.
     */
    #rainbowize(args) {

        // Build text together
        const rbString = args.map(item => {
            return ((typeof item !== 'string') ? JSON.stringify(item) : item);
        }).join(' ');

        const rainbow = [COLOR.RED, COLOR.GREEN, COLOR.YELLOW, COLOR.BLUE, COLOR.MAGENTA, COLOR.CYAN, COLOR.WHITE];

        let pos = -1;
        let rbReturn = '';
        for (let i = 0; i < rbString.length; i++) {
            const char = rbString[i];
            if (char.match(/\s/g)) { rbReturn += char; continue; }
            pos++;
            if (pos === rainbow.length) pos = 0;
            rbReturn += COLOR.RESET + rainbow[pos] + rbString[i];
        }

        return rbReturn;
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

        // Check type
        let args = [];
        let labelColors = '';
        let colors = '';
        if (arguments.length == 2) {

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            //colors = COLOR.RESET + colors.join('');

            // Check if color rainbow
            if (colors.length === 1 && colors[0].key === 'RAINBOW') {

                const rainbow = this.#rainbowize(arguments[1]);
                args = [rainbow];

            } else {

                // Build text
                args = arguments[1].map(item => {
                    return COLOR.RESET + colors.join('') + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET;
                });

            }


        } else {

            // Filter just labelObjects
            labelColors = arguments[0].filter(item => item.name === 'labelObject');

            // Check for defaults
            if (labelColors.length === 0 || labelColors[0].key === 'DEFAULT') {
                labelColors = this.#defaultLogLabel.filter(item => item.name === 'labelObject');
            }

            // Join to string
            labelColors = LABEL.RESET + labelColors.join('');

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            colors = COLOR.RESET + colors.join('');

            // Build label
            args = arguments[1].map(item => {
                return labelColors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + LABEL.RESET;
            });

            // Build text
            const args2 = arguments[2].map(item => {
                return colors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET
            });

            // Merge arrays
            args = args.concat(args2);
        }

        // The history item
        const historyItem = {
            args: arguments,
            defaultLog: this.defaultLog,
            defaultLogLabel: this.#defaultLogLabel,
            diff: diff,
            diffString: diffString,
            profile: prof,
            output: args
        };

        // Write to history if record is enabled
        if (this.record) {
            this.history.push(historyItem);
        }

        // Emit event
        this.emit('log', { type: 'curryConsole.log()', params: historyItem });

        // Check if writing to history only.
        if (!this.#verbose) return;

        // Label + Standard
        this.#standardLog(...args, prof);

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

        // Check type
        let args = [];
        let labelColors = '';
        let colors = '';
        if (arguments.length == 2) {

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            colors = COLOR.RESET + colors.join('');

            // Build text
            args = arguments[1].map(item => {
                return colors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET;
            });

        } else {

            // Filter just labelObjects
            labelColors = arguments[0].filter(item => item.name === 'labelObject');

            // Check for defaults
            if (labelColors.length === 0 || labelColors[0].key === 'DEFAULT') {
                labelColors = this.#defaultLogLabel.filter(item => item.name === 'labelObject');
            }

            // Join to string
            labelColors = LABEL.RESET + labelColors.join('');

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            colors = COLOR.RESET + colors.join('');

            // Build label
            args = arguments[1].map(item => {
                return labelColors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + LABEL.RESET;
            });

            // Build text
            const args2 = arguments[2].map(item => {
                return colors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET
            });

            // Merge arrays
            args = args.concat(args2);
        }

        // The history item
        const historyItem = {
            args: arguments,
            defaultLog: this.defaultLog,
            defaultLogLabel: this.#defaultLogLabel,
            diff: diff,
            diffString: diffString,
            profile: prof,
            output: args
        };

        // Write to history if record is enabled
        if (this.record) {
            this.history.push(historyItem);
        }

        // Emit event
        this.emit('info', { type: 'curryConsole.info()', params: historyItem });

        // Check if writing to history only.
        if (!this.#verbose) return;

        // Label + Standard
        this.#standardInfo(...args, prof);

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

        // Check type
        let args = [];
        let labelColors = '';
        let colors = '';
        if (arguments.length == 2) {

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            colors = COLOR.RESET + colors.join('');

            // Build text
            args = arguments[1].map(item => {
                return colors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET;
            });

        } else {

            // Filter just labelObjects
            labelColors = arguments[0].filter(item => item.name === 'labelObject');

            // Check for defaults
            if (labelColors.length === 0 || labelColors[0].key === 'DEFAULT') {
                labelColors = this.#defaultLogLabel.filter(item => item.name === 'labelObject');
            }

            // Join to string
            labelColors = LABEL.RESET + labelColors.join('');

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            colors = COLOR.RESET + colors.join('');

            // Build label
            args = arguments[1].map(item => {
                return labelColors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + LABEL.RESET;
            });

            // Build text
            const args2 = arguments[2].map(item => {
                return colors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET
            });

            // Merge arrays
            args = args.concat(args2);
        }

        // The history item
        const historyItem = {
            args: arguments,
            defaultLog: this.defaultLog,
            defaultLogLabel: this.#defaultLogLabel,
            diff: diff,
            diffString: diffString,
            profile: prof,
            output: args
        };

        // Write to history if record is enabled
        if (this.record) {
            this.history.push(historyItem);
        }

        // Emit event
        this.emit('warn', { type: 'curryConsole.warn()', params: historyItem });

        // Check if writing to history only.
        if (!this.#verbose) return;

        // Label + Standard
        this.#standardWarn(...args, prof);
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

        // Check type
        let args = [];
        let labelColors = '';
        let colors = '';
        if (arguments.length == 2) {

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            colors = COLOR.RESET + colors.join('');

            // Build text
            args = arguments[1].map(item => {
                return colors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET;
            });

        } else {

            // Filter just labelObjects
            labelColors = arguments[0].filter(item => item.name === 'labelObject');

            // Check for defaults
            if (labelColors.length === 0 || labelColors[0].key === 'DEFAULT') {
                labelColors = this.#defaultLogLabel.filter(item => item.name === 'labelObject');
            }

            // Join to string
            labelColors = LABEL.RESET + labelColors.join('');

            // Filter just colorObjects
            colors = arguments[0].filter(item => item.name === 'colorObject');

            // Check for default
            if (colors.length === 0 || colors[0].key === 'DEFAULT') {
                colors = this.#defaultLog.filter(item => item.name === 'colorObject');
            }

            // Join to string
            colors = COLOR.RESET + colors.join('');

            // Build label
            args = arguments[1].map(item => {
                return labelColors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + LABEL.RESET;
            });

            // Build text
            const args2 = arguments[2].map(item => {
                return colors + ((typeof item !== 'string') ? JSON.stringify(item) : item) + COLOR.RESET
            });

            // Merge arrays
            args = args.concat(args2);
        }

        // The history item
        const historyItem = {
            args: arguments,
            defaultLog: this.defaultLog,
            defaultLogLabel: this.#defaultLogLabel,
            diff: diff,
            diffString: diffString,
            profile: prof,
            output: args
        };

        // Write to history if record is enabled
        if (this.record) {
            this.history.push(historyItem);
        }

        // Emit event
        this.emit('error', { type: 'curryConsole.error()', params: historyItem });

        // Check if writing to history only.
        if (!this.#verbose) return;

        // Label + Standard
        this.#standardError(...args, prof);

    }


}