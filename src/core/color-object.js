'use strict';

import { curryObject } from "./curry-object.js";

/**
 * For creating a colorObject.
 */
export class colorObject extends curryObject {

    /**
     * The constructor for the colorObject.
     * @param {string} key - The key to set.
     * @param {string} value - The value to set.
     */
    constructor(key, value) {

        super(key, value);

    }

    /**
     * Converts a hex color code string into a colorObject that you can use in curryConsole.
     * @param {string} hex - The hex color code string to parse.
     * @param {undefined|string} position - The position of the color. (TEXT|FG|FRONT|FOREGROUND|BG|BACK|BACKGROUND). Defaults to FG.
     * @returns {colorObject} - The colorObject set with the new color.
     */
    HEX(hex, position = 'FG') {

        let FG = true;
        switch(position.trim().toUpperCase()) {
            case '':
            case 'TEXT':
            case 'FG':
            case 'FRONT':
            case 'FOREGROUND': FG = true; break;
            case 'BG':
            case 'BACK':
            case 'BACKGROUND': FG = false; break;
            default: throw new TypeError(`Method HEX() second parameter must be one of these options (TEXT|FG|FRONT|FOREGROUND|BG|BACK|BACKGROUND)!`);
        }

        // Trim string first
        hex = hex.trim().toUpperCase();

        // Remove # at start
        if (hex.startsWith('#')) hex = hex.slice(1);

        switch (hex.length) {

            case 3:

                hex = hex.split('').map(h => h + h).join('');

            case 6:

                const m = hex.match(/^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/mis);

                if (!m || m.length !== 4) throw new TypeError(`Method HEX() first parameter is an invalid hex code string!`);

                const rgb = [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];

                this.value = `\x1b[${(FG)?38:48};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;

                return this;


            default: throw new TypeError('Method HEX() first parameter must be a hex code string that is 3 or 6 characters long.')
        }

    }

    /**
     * Creates a custom color from an RGB color code.
     * @param {number} red - The number for red.
     * @param {number} green - The number for green.
     * @param {number} blue - The number for blue.
     * @param {undefined|string} position - The position of the color. (TEXT|FG|FRONT|FOREGROUND|BG|BACK|BACKGROUND). Defaults to FG.
     * @returns 
     */
    RGB(red, green, blue, position = 'FG') {

        let FG = true;
        switch(position.trim().toUpperCase()) {
            case '':
            case 'TEXT':
            case 'FG':
            case 'FRONT':
            case 'FOREGROUND': FG = true; break;
            case 'BG':
            case 'BACK':
            case 'BACKGROUND': FG = false; break;
            default: throw new TypeError(`Method RGB() second parameter must be one of these options (TEXT|FG|FRONT|FOREGROUND|BG|BACK|BACKGROUND)!`);
        }

        this.value = `\x1b[${(FG)?38:48};2;${red};${green};${blue}m`;

        return this;

    }

}
