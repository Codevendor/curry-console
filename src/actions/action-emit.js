'use strict';

import { parseBool } from "../helpers/parse-bool.js";

/**
 * Enables or disables emit events per message.
 * @param {boolean|string|number} enabled - Whether to enable or disable emit events per message.
 * @returns {boolean} - Whether emit events per message.
 */
export function actionEmit(enabled = true) {

    return parseBool(enabled);

}