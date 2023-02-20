'use strict';

import { curryObject } from "./curry-object.js";

/**
 * For creating a actionObject.
 */
export class actionObject extends curryObject {

    // Private fields
    #method = ()=>{};
    #args = undefined;
    
    /** The method property. */
    get method() { return this.#method; }

    /** The method args */
    get args() { return this.#args; }

    /**
     * The constructor for the actionObject.
     * @param {string} key - The key to set.
     * @param {function} method - The method to call.
     * @param {array} args - The method arguments.
     */
    constructor(key, method, args) {

        super(key, '');

        this.#method = method;
        this.#args = args;

    }

}