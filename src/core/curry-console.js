'use strict';

// Imports
import { curryEventEmitter } from "./event-emitter.js";
import { COLOR } from "./color.js";
import { LABEL } from "./label.js";
import { ACTION } from "./action.js";
import { onlyCurryTypes, calculateTime, rainbowize, groupTypes, parseBool, type_of } from "../helpers/helpers.js";
import { actionDebug } from "../actions/actions.js";

/**
 * Adds color features to console, without changing standard functionality.
 */
export class curryConsole extends curryEventEmitter {

    #history = [];
    #profile = false;
    #verbose = false;
    #record = false;
    #debug = false;
    #emitter = false;

    #utcPrev = 0;

    #console = {
        log: null,
        info: null,
        warn: null,
        error: null
    };

    #defaults = {
        log: [],
        info: [],
        warn: [],
        error: [],
    };

    /** Returns the history of the logging. */
    get history() { return this.#history; }

    /** Gets whether in profile mode and displaying profiler information. */
    get profile() { return this.#profile; }

    /**
     * Sets whether in profile mode and displaying profiler information.
     * @param {boolean} value - Whether to display profiler information in terminal.
     */
    set profile(value) { this.#profile = parseBool(value); }

    /** Gets whether in verbose mode and displaying to terminal. */
    get verbose() { return this.#verbose; }

    /**
     * Sets whether in verbose mode and displaying to terminal.
     * @param {boolean} value - Whether to display to terminal.
     */
    set verbose(value) { this.#verbose = parseBool(value); }

    /** Gets whether in record mode and recording all console history. */
    get record() { return this.#record; }

    /**
     * Sets whether in record mode and recording all console history.
     * @param {boolean} value - Whether to record history.
     */
    set record(value) { this.#record = parseBool(value); }

    /** Gets whether in debug mode and and can see filepath and line and colum number. */
    get debug() { return this.#debug; }

    /**
     * Sets whether in debug mode is outputing information, filepath, line and colum number.
     * @param {boolean} value - Whether to output debug info, filepath, line and colum number.
     */
    set debug(value) { this.#debug = parseBool(value); }

    /** Gets whether in emitter mode and fires emit events. */
    get emitter() { return this.#emitter; }

    /**
     * Sets whether in emitter mode and fires emit events..
     * @param {boolean} value - Whether in emitter mode and fires emit events..
     */
    set emitter(value) { this.#emitter = parseBool(value); }

    /** Gets the defaults */
    get defaults() { return this.#defaults; }

    /** Gets the defaults for log. */
    get defaultsLog() { return this.#defaults.log; }

    /**
     * Sets the defaults for log.
     * @param {array} value - The defaults for log.
     */
    set defaultsLog(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultLog value, must be an array of curryConsoleType(s).`);
        this.#defaults.log = value;
    }

    /** Gets the defaults for info. */
    get defaultsInfo() { return this.#defaults.info; }

    /**
     * Sets the defaults for info.
     * @param {array} value - The defaults for info.
     */
    set defaultsInfo(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultInfo value, must be an array of curryConsoleType(s).`);
        this.#defaults.info = value;
    }

    /** Gets the defaults for warn. */
    get defaultsWarn() { return this.#defaults.warn; }

    /**
     * Sets the defaults for warn.
     * @param {array} value - The defaults for warn.
     */
    set defaultsWarn(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultWarn value, must be an array of curryConsoleType(s).`);
        this.#defaults.warn = value;
    }

    /** Gets the defaults for error. */
    get defaultsError() { return this.#defaults.error; }

    /**
     * Sets the defaults for error.
     * @param {array} value - The defaults for error.
     */
    set defaultsError(value) {
        if (!Array.isArray(value)) throw new TypeError(`Property defaultError value, must be an array of curryConsoleType(s).`);
        this.#defaults.error = value;
    }

    /**
     * The constructor for the curryConsole.
     * @param {boolean} verbose - Whether to display messages.
     * @param {boolean} profile - Whether to enable profiling. 
     * @param {boolean} record - Whether to record messages to history.
     * @param {boolean} debug - Whether to show debug information.
     * @param {boolean} emitter - Whether to emit events with event emitter.
     */
    constructor(verbose = true, profile = false, record = false, debug = false, emitter = false) {

        // Extend emitter
        super();

        this.#history = [];
        this.#verbose = verbose;
        this.#profile = profile;
        this.#record = record;
        this.#debug = debug;
        this.#emitter = emitter;

        // Backup original methods
        this.#console = {};
        this.#console.log = console.log;
        this.#console.info = console.info;
        this.#console.warn = console.warn;
        this.#console.error = console.error;

        const self = this;

        // Log
        console.log = (...a) => {

            if (a.length === 0 || onlyCurryTypes(a)) {

                return (...b) => {
                    self.#process('log', a, b);
                };

            }

            // Emit Event
            if (this.#emitter) self.emit('message', { library: 'console', type: 'log', args: a });

            // Write to standard console.log
            self.#console.log(...a);

        };

        // Info
        console.info = (...a) => {

            if (a.length === 0 || onlyCurryTypes(a)) {

                return (...b) => {
                    self.#process('info', a, b);
                };

            }

            // Emit Event
            if (this.#emitter) self.emit('message', { library: 'console', type: 'info', args: a });

            // Write to standard console.info
            self.#console.info(...a);

        };

        // Warn
        console.warn = (...a) => {

            if (a.length === 0 || onlyCurryTypes(a)) {

                return (...b) => {
                    self.#process('warn', a, b);
                };

            }

            // Emit Event
            if (this.#emitter) self.emit('message', { library: 'console', type: 'warn', args: a });

            // Write to standard console.warn
            self.#console.warn(...a);

        };

        // Error
        console.error = (...a) => {

            if (a.length === 0 || onlyCurryTypes(a)) {

                return (...b) => {
                    self.#process('error', a, b);
                };

            }

            // Emit Event
            if (this.#emitter) self.emit('message', { library: 'console', type: 'error', args: a });

            // Write to standard console.error
            self.#console.error(...a);

        };

    }

    /** Resets the history. */
    reset() {
        this.#history = [];
    }

    /**
     * Calculates a profile time object.
     * @param {boolean} enabled - Whether to show profile info. 
     * @returns {object} - Returns an object ith profile information.
     */
    #profiler(enabled = false) {

        const profile = {

            curr: 0,
            diff: 0,
            str: '',
            output: ''

        };

        if (enabled) {

            profile.curr = Number(new Date());
            profile.diff = profile.curr - this.#utcPrev;

            // Store new utc
            this.#utcPrev = profile.curr;

            profile.str = calculateTime(profile.diff);
            profile.output = COLOR.RESET + COLOR.DIM + COLOR.WHITE + profile.str + COLOR.RESET;

        }

        return profile;

    }

    /**
     * Processes the console calls.
     * @param {string} logType - The log type (log, info, warn, error)
     * @param {array} curryConsoleTypes - The curry console types to process.
     * @param {any} args - The arguments to process. 
     */
    #process(logType, curryConsoleTypes, args) {

        // Get modes
        let verboseMode = this.#verbose;
        let emitterMode = this.#emitter;
        let recordMode = this.#record;

        // Get profile object
        let profile = this.#profiler(this.#profile);

        // Gets the debug info
        let debugInfo = actionDebug(this.#debug);

        // Get defaults 
        const defaults = this.#defaults[logType];

        // Group all the cuuryConsoleTypes
        const types = groupTypes(curryConsoleTypes, defaults);

        // Check if no label or label
        let preColors = [];
        let outputArgs = [];

        // Check if has label
        let label = undefined;
        let preLabel = '';
        if (types.labelObject.length > 0) {

            // Get label
            label = args.shift();

            // Check if label rainbow
            if (types.labelObject.find(item => item.key === 'RAINBOW')) {

                preLabel = rainbowize([label]);

            } else {

                // Check if not string
                preLabel = label;
                if (type_of(preLabel) !== 'string') preLabel = JSON.stringify(preLabel);
                preLabel = COLOR.RESET + types.labelObject.join('') + preLabel + COLOR.RESET;
            }

        }

        // Check for other parameters
        if (args.length > 0) {

            // Check if color rainbow
            if (types.colorObject.find(item => item.key === 'RAINBOW')) {

                const rainbow = rainbowize(args);
                preColors = [rainbow];

            } else {

                // Build text
                preColors = args.map(item => {
                    if (type_of(item) !== 'string') item = JSON.stringify(item);
                    return COLOR.RESET + types.colorObject.join('') + item + COLOR.RESET;
                });

            }

        }

        // Check if label
        if(label) {
            // Combine labels with colors
            outputArgs = [preLabel].concat(preColors);
        } else {
            outputArgs = preColors;
        }

        // Emit event
        if (this.#emitter) this.emit('message', { type: `curryConsole.${logType}()`, params: historyItem });

        // Loop through actions
        for (let i = 0; i < types.actionObject.length; i++) {

            const action = types.actionObject[i];
            switch (action.key) {

                // Indent
                case 'INDENT':

                    const indent = action.method(...action.args);
                    outputArgs.unshift(indent);
                    break;

                // Show message
                case 'PROFILE':

                    const prof = action.method(...action.args);
                    profile = this.#profiler(prof);
                    break;

                // Show message
                case 'VERBOSE':

                    verboseMode = action.method(...action.args);
                    break;

                // Whether to record.
                case 'RECORD':

                    recordMode = action.method(...action.args);
                    break;

                case 'EMITTER':

                    emitterMode = action.method(...action.args);
                    break;

                // Show Debug info
                case 'DEBUG':

                    debugInfo = action.method(...action.args);
                    break;

                // Delays a message
                case 'DELAY': break;

                // Not specified
                default: break;

            }

        }

        // The history item
        const historyItem = {
            library: 'curry-console',
            type: logType,
            label: label,
            emitterMode: emitterMode,
            verboseMode: verboseMode,
            recordMode: recordMode,
            args: arguments,
            globlaDefaluts: defaults,
            processedTypes: types,
            profile: profile,
            outputArgs: outputArgs
        };

        // Record history
        if (recordMode) this.history.push(historyItem);

        // Emit Event
        if (emitterMode) this.emit('message', historyItem);

        // Check if delay
        const delay = types.actionObject.find(item => item.key === 'DELAY');
        if (delay) {

            const tempArgs = delay.args;
            const cb = () => {

                // Write
                if (this.#verbose) this.#console[logType](...outputArgs, profile.output + debugInfo.output);

            };
            tempArgs.push(cb);

            delay.method(...tempArgs);
            return;
        }

        // Write 
        if (this.#verbose) this.#console[logType](...outputArgs, profile.output + debugInfo.output);

    }

}