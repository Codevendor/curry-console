'use strict';

import { curryObject } from "./curry-object.js";

/**
 * For creating a labelObject.
 */
export class labelObject extends curryObject {

    /**
     * The constructor for the labelObject.
     * @param {string} key - The key to set.
     * @param {string} value - The value to set.
     */
    constructor(key, value) {

        super(key, value);

    }

}
