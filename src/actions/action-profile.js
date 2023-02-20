'use strict';

import { parseBool } from "../helpers/parse-bool.js";

/**
 * Enables or disables profiling per message.
 * @param {boolean|string|number} enabled - Whether to enable or disable profiling per message.
 * @returns {boolean} - Whether profiling per message.
 */
export function actionProfile(enabled = true) {

    return parseBool(enabled);

}