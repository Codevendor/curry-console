'use strict';

/**
 * For extending curryObject.
 */
export class curryObject {

    // Private Fields
    #key = '';
    #value = '';

    /** Gets the key. */
    get key() { return this.#key; }

    /**
     * Sets the key string.
     * @param {string} value - The key string.
     */
    set key(value) { this.#key = this.#key; }

    /** Gets the value. */
    get value() { return this.#value; }

    /**
     * Sets the value string.
     * @param {string} value - The value string.
     */
    set value(value) { this.#value = this.#value; }

    /** Get the name of the class. */
    get name() { return this.constructor.name; }

    /** Returns a static type. */
    get type() { return 'curryConsoleType'; }

    /**
     * The constructor for the curryObject.
     * @param {string} key - The key to set.
     * @param {string} value - The value to set.
     */
    constructor(key, value) {

        this.#key = key;
        this.#value = value;

    }

    /** Writes the value as a string. */
    toString() {
        return this.#value;
    }
}
