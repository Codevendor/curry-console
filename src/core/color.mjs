'use strict';

// Imports
import { colorObject } from "./color-object.mjs";

/**
 * Custom color objects.
 */
export const COLOR = {

    BLACK: new colorObject("\x1b[30m"),
    RED: new colorObject("\x1b[31m"),
    GREEN: new colorObject("\x1b[32m"),
    YELLOW: new colorObject("\x1b[33m"),
    BLUE: new colorObject("\x1b[34m"),
    MAGENTA: new colorObject("\x1b[35m"),
    CYAN: new colorObject("\x1b[36m"),
    WHITE: new colorObject("\x1b[37m"),

    DEFAULT: new colorObject(''),
    RESET: new colorObject("\x1b[0m"),
    BRIGHT: new colorObject("\x1b[1m"),
    DIM: new colorObject("\x1b[2m"),
    UNDERCORE: new colorObject("\x1b[4m"),
    BLINK: new colorObject("\x1b[5m"),
    REVERSE: new colorObject("\x1b[7m"),
    HIDDEN: new colorObject("\x1b[8m"),

    FG_BLACK: new colorObject("\x1b[30m"),
    FG_RED: new colorObject("\x1b[31m"),
    FG_GREEN: new colorObject("\x1b[32m"),
    FG_YELLOW: new colorObject("\x1b[33m"),
    FG_BLUE: new colorObject("\x1b[34m"),
    FG_MAGENTA: new colorObject("\x1b[35m"),
    FG_CYAN: new colorObject("\x1b[36m"),
    FG_WHITE: new colorObject("\x1b[37m"),

    BG_BLACK: new colorObject("\x1b[40m"),
    BG_RED: new colorObject("\x1b[41m"),
    BG_GREEN: new colorObject("\x1b[42m"),
    BG_YELLOW: new colorObject("\x1b[43m"),
    BG_BLUE: new colorObject("\x1b[44m"),
    BG_MAGENTA: new colorObject("\x1b[45m"),
    BG_CYAN: new colorObject("\x1b[46m"),
    BG_WHITE: new colorObject("\x1b[47m")
};