'use strict';

/**
 * Calculates the milliseconds into shorthand string.
 * @param {number} ms - The milliseconds to caculate into shorthand string.
 * @returns {string} - The shorthand string.
 */
export function calculateTime(ms) {

    let ms2 = ((ms % 1000) / 100).toString().split('.');
    ms2 = (ms2.length > 1) ? ms2[1] : ms2[0];
    const secs = Math.floor((ms / 1000) % 60);

    return `+${secs}.${ms2}ms`;
}