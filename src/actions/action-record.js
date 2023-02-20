'use strict';

import { parseBool } from "../helpers/parse-bool.js";

/**
 * Enables or disables history recording per message.
 * @param {boolean|string|number} enabled - Whether to enable or disable history recording per message.
 * @returns {boolean} - Whether history recording per message.
 */
export function actionRecord(enabled = true) {

    return parseBool(enabled);

}