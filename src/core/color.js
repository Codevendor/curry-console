'use strict';

// Imports
import { colorObject } from "./color-object.js";

/**
 * Custom color objects.
 */
export const COLOR = {

    BLACK: new colorObject("BLACK", "\x1b[30m"),
    RED: new colorObject("RED", "\x1b[31m"),
    GREEN: new colorObject("GREEN", "\x1b[32m"),
    YELLOW: new colorObject("YELLOW", "\x1b[33m"),
    BLUE: new colorObject("BLUE", "\x1b[34m"),
    MAGENTA: new colorObject("MAGENTA", "\x1b[35m"),
    CYAN: new colorObject("CYAN", "\x1b[36m"),
    WHITE: new colorObject("WHITE", "\x1b[37m"),

    DEFAULT: new colorObject("DEFAULT", ""),
    RESET: new colorObject("RESET", "\x1b[0m"),
    BOLD: new colorObject("BOLD", "\x1b[1m"),
    DIM: new colorObject("DIM", "\x1b[2m"),
    ITALIC: new colorObject("DIM", "\x1b[3m"),
    UNDERLINE: new colorObject("UNDERLINE", "\x1b[4m"),
    BLINK: new colorObject("BLINK", "\x1b[5m"),
    REVERSE: new colorObject("REVERSE", "\x1b[7m"),
    HIDDEN: new colorObject("HIDDEN", "\x1b[8m"),
    STRIKE: new colorObject("STRIKE", "\x1b[9m"),
    OUTLINE: new colorObject("OUTLINE", "\x1b[53m"),
    RAINBOW: new colorObject("RAINBOW", ""),
    CAPS: new colorObject("CAPS", ""),
    CAPFIRST: new colorObject("CAPFIRST", ""),

    FG_BLACK: new colorObject("FG_BLACK", "\x1b[30m"),
    FG_RED: new colorObject("FG_RED", "\x1b[31m"),
    FG_GREEN: new colorObject("FG_GREEN", "\x1b[32m"),
    FG_YELLOW: new colorObject("FG_YELLOW", "\x1b[33m"),
    FG_BLUE: new colorObject("FG_BLUE", "\x1b[34m"),
    FG_MAGENTA: new colorObject("FG_MAGENTA", "\x1b[35m"),
    FG_CYAN: new colorObject("FG_CYAN", "\x1b[36m"),
    FG_WHITE: new colorObject("FG_WHITE", "\x1b[37m"),

    BG_BLACK: new colorObject("BG_BLACK", "\x1b[40m"),
    BG_RED: new colorObject("BG_RED", "\x1b[41m"),
    BG_GREEN: new colorObject("BG_GREEN", "\x1b[42m"),
    BG_YELLOW: new colorObject("BG_YELLOW", "\x1b[43m"),
    BG_BLUE: new colorObject("BG_BLUE", "\x1b[44m"),
    BG_MAGENTA: new colorObject("BG_MAGENTA", "\x1b[45m"),
    BG_CYAN: new colorObject("BG_CYAN", "\x1b[46m"),
    BG_WHITE: new colorObject("BG_WHITE", "\x1b[47m"),

};