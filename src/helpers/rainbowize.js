'use strict';

/**
 * Rainbowizes text output colors.
 * @param {*} args - The arguments to merge into rainbox text.
 * @return {string} - A rainbow text string.
 */
export function rainbowize(args) {

    // Build text together
    const rbString = args.map(item => {
        return ((typeof item !== 'string') ? JSON.stringify(item) : item);
    }).join(' ');

    const rainbow = [COLOR.RED, COLOR.GREEN, COLOR.YELLOW, COLOR.BLUE, COLOR.MAGENTA, COLOR.CYAN, COLOR.WHITE];

    let pos = -1;
    let rbReturn = '';
    for (let i = 0; i < rbString.length; i++) {
        const char = rbString[i];
        if (char.match(/\s/g)) { rbReturn += char; continue; }
        pos++;
        if (pos === rainbow.length) pos = 0;
        rbReturn += COLOR.RESET + rainbow[pos] + rbString[i];
    }

    return rbReturn;
}