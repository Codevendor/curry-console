'use strict';

import path from "node:path";
import { COLOR } from "../core/color.js";
import { parseBool } from "../helpers/parse-bool.js";

/**
 * Writes debug information like filepath, line number and column.
 * @param {boolean|string|number} enabled - Whether the action debug is enabled. 
 * @returns {object} - The debug info object.
 */
export function actionDebug(enabled = true) {

    enabled = parseBool(enabled);

    const info = {
        filePath: '',
        line: 0,
        column: 0,
        stack: '',
        output: ''
    };

    if(enabled) {

        const e = new Error();
        info.stack = e.stack;

        const regex = /([^:]+):([\d]{0,}):([\d]{0,})/ims;
        const lines = e.stack.split("\n");
        const match = lines[4].match(regex)
        if(match.length === 4 ){
    
            info['filePath'] = path.normalize(path.resolve(match[1]));
            info['line'] = match[2];
            info['column'] = match[3];
        }

        info.output = COLOR.RESET + COLOR.DIM + COLOR.WHITE + ` - File:${info.filePath}, Line:${info.line}, Column:${info.column}` + COLOR.RESET;

    }

    return info;
}