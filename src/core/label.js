'use strict';

// Imports
import { labelObject } from "./label-object.js";

/**
 * Custom color objects.
 */
export const LABEL = {

    BLACK: new labelObject("BLACK", "\x1b[30m"),
    RED: new labelObject("RED", "\x1b[31m"),
    GREEN: new labelObject("GREEN", "\x1b[32m"),
    YELLOW: new labelObject("YELLOW", "\x1b[33m"),
    BLUE: new labelObject("BLUE", "\x1b[34m"),
    MAGENTA: new labelObject("MAGENTA", "\x1b[35m"),
    CYAN: new labelObject("CYAN", "\x1b[36m"),
    WHITE: new labelObject("WHITE", "\x1b[37m"),

    DEFAULT: new labelObject("DEFAULT", ""),
    RESET: new labelObject("RESET", "\x1b[0m"),
    BOLD: new labelObject("BOLD", "\x1b[1m"),
    DIM: new labelObject("DIM", "\x1b[2m"),
    ITALIC: new labelObject("ITALIC", "\x1b[3m"),
    UNDERLINE: new labelObject("UNDERLINE", "\x1b[4m"),
    BLINK: new labelObject("BLINK", "\x1b[5m"),
    REVERSE: new labelObject("REVERSE", "\x1b[7m"),
    HIDDEN: new labelObject("HIDDEN", "\x1b[8m"),
    STRIKE: new labelObject("STRIKE", "\x1b[9m"),
    OUTLINE: new labelObject("OUTLINE", "\x1b[53m"),
    RAINBOW: new labelObject("RAINBOW", ""),
    CAPS: new labelObject("CAPS", ""),
    CAPFIRST: new labelObject("CAPFIRST", ""),

    FG_BLACK: new labelObject("FG_BLACK", "\x1b[30m"),
    FG_RED: new labelObject("FG_RED", "\x1b[31m"),
    FG_GREEN: new labelObject("FG_GREEN", "\x1b[32m"),
    FG_YELLOW: new labelObject("FG_YELLOW", "\x1b[33m"),
    FG_BLUE: new labelObject("FG_BLUE", "\x1b[34m"),
    FG_MAGENTA: new labelObject("FG_MAGENTA", "\x1b[35m"),
    FG_CYAN: new labelObject("FG_CYAN", "\x1b[36m"),
    FG_WHITE: new labelObject("FG_WHITE", "\x1b[37m"),

    BG_BLACK: new labelObject("BG_BLACK", "\x1b[40m"),
    BG_RED: new labelObject("BG_RED", "\x1b[41m"),
    BG_GREEN: new labelObject("BG_GREEN", "\x1b[42m"),
    BG_YELLOW: new labelObject("BG_YELLOW", "\x1b[43m"),
    BG_BLUE: new labelObject("BG_BLUE", "\x1b[44m"),
    BG_MAGENTA: new labelObject("BG_MAGENTA", "\x1b[45m"),
    BG_CYAN: new labelObject("BG_CYAN", "\x1b[46m"),
    BG_WHITE: new labelObject("BG_WHITE", "\x1b[47m"),

    HEX: (...args)=> new labelObject("CUSTOM", "").HEX(...args),
    RGB: (...args)=> new labelObject("CUSTOM", "").RGB(...args),
};