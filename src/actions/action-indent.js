'use strict';

import { type_of } from "../helpers/type-of.js";

/**
 * Indents the start of the message with a single tab of specified string or number.
 * @param {undefined|string|number} indent - Indents with type, the front of the whole message, including the tab.
 * @returns {string} - The indent type.
 */
export function actionIndent(indent = "\t") {

    if (type_of(indent) !== 'undefined' && type_of(indent) !== 'string' && type_of(indent) !== 'number') throw new TypeError(`Method actionIndent has incorrect type for first parameter (indent), must be a number or string.`);

    return indent.toString();

}