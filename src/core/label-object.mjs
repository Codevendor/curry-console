'use strict';

/**
 * For creating a colorObject.
 */
export class labelObject {

    // Private Fields
    #color = '';

    /** Gets the color string. */
    get color() { return this.#color; }

    /** Returns a static type. */
    get type() { return 'curryConsoleType'; }

    /**
     * Sets the color string.
     * @param {string} value - The color as a string.
     */
    set color(value) { this.#color = this.#color; }

    /** Get the name of the class. */
    get name() { return this.constructor.name; }

    /**
     * The constructor for the labelObject.
     * @param {string} color - The color as a string.
     */
    constructor(color = '') {

        this.#color = color;

    }

    /** Writes the color as a string. */
    toString() {
        return this.#color;
    }
}
