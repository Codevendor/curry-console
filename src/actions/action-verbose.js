'use strict';

import { parseBool } from "../helpers/parse-bool.js";

/**
 * Enables or disables showing a message.
 * @param {boolean|string|number} enabled - Whether to enable or disable showing a message.
 * @returns {boolean} - Whether to show a message.
 */
export function actionVerbose(enabled = true) {

    return parseBool(enabled);

}