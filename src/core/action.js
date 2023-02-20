'use strict';

// Imports
import { actionObject } from "./action-object.js";

import { actionCall } from "../actions/action-call.js";
import { actionDateTime } from "../actions/action-date-time.js";
import { actionDebug } from "../actions/action-debug.js";
import { actionDelay } from "../actions/action-delay.js";
import { actionEmitter } from "../actions/action-emitter.js";
import { actionID } from "../actions/action-id.js";
import { actionIndent } from "../actions/action-indent.js";
import { actionProfile } from "../actions/action-profile.js";
import { actionProgressBar } from "../actions/action-progress-bar.js";
import { actionRecord } from "../actions/action-record.js";
import { actionSpinner } from "../actions/action-spinner.js";
import { actionVerbose } from "../actions/action-verbose.js";

/**
 * Custom action objects.
 */
export const ACTION = {

    CALL: (...args) => { return new actionObject("CALL", actionCall, args); },
    DATETIME: (...args) => { return new actionObject("DATETIME", actionDateTime, args); },
    DEBUG: (...args) => { return new actionObject("DEBUG", actionDebug, args); },
    DELAY: (...args) => { return new actionObject("DELAY", actionDelay, args); },
    EMITTER: (...args) => { return new actionObject("EMITTER", actionEmitter, args); },
    ID: (...args) => { return new actionObject("ID", actionID, args); },
    INDENT: (...args) => { return new actionObject("INDENT", actionIndent, args); },
    PROFILE: (...args) => { return new actionObject("PROFILE", actionProfile, args); },
    PROGRESSBAR: (...args) => { return new actionObject("PROGRESSBAR", actionProgressBar, args); },
    RECORD: (...args) => { return new actionObject("RECORD", actionRecord, args); },
    SPINNER: (...args) => { return new actionObject("SPINNER", actionSpinner, args); },
    VERBOSE: (...args) => { return new actionObject("VERBOSE", actionVerbose, args); }

}