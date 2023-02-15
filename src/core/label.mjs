'use strict';

// Imports
import { labelObject } from "./label-object.mjs";

/**
 * Custom color objects.
 */
export const LABEL = {

    BLACK: new labelObject("\x1b[30m"),
    RED: new labelObject("\x1b[31m"),
    GREEN: new labelObject("\x1b[32m"),
    YELLOW: new labelObject("\x1b[33m"),
    BLUE: new labelObject("\x1b[34m"),
    MAGENTA: new labelObject("\x1b[35m"),
    CYAN: new labelObject("\x1b[36m"),
    WHITE: new labelObject("\x1b[37m"),

    DEFAULT: new labelObject(''),
    RESET: new labelObject("\x1b[0m"),
    BRIGHT: new labelObject("\x1b[1m"),
    DIM: new labelObject("\x1b[2m"),
    UNDERCORE: new labelObject("\x1b[4m"),
    BLINK: new labelObject("\x1b[5m"),
    REVERSE: new labelObject("\x1b[7m"),
    HIDDEN: new labelObject("\x1b[8m"),

    FG_BLACK: new labelObject("\x1b[30m"),
    FG_RED: new labelObject("\x1b[31m"),
    FG_GREEN: new labelObject("\x1b[32m"),
    FG_YELLOW: new labelObject("\x1b[33m"),
    FG_BLUE: new labelObject("\x1b[34m"),
    FG_MAGENTA: new labelObject("\x1b[35m"),
    FG_CYAN: new labelObject("\x1b[36m"),
    FG_WHITE: new labelObject("\x1b[37m"),

    BG_BLACK: new labelObject("\x1b[40m"),
    BG_RED: new labelObject("\x1b[41m"),
    BG_GREEN: new labelObject("\x1b[42m"),
    BG_YELLOW: new labelObject("\x1b[43m"),
    BG_BLUE: new labelObject("\x1b[44m"),
    BG_MAGENTA: new labelObject("\x1b[45m"),
    BG_CYAN: new labelObject("\x1b[46m"),
    BG_WHITE: new labelObject("\x1b[47m")
};