'use strict';

/** Create an event emitter class for extending. */
export class curryEventEmitter {

    // Private fields
    #events = {};

    constructor() {
        this.#events = {};
    }

    /**
     * Adds a listener at the end of the listeners array for the specified event. 
     * @param {string} name - The name for the listener.
     * @param {function} listener - The listener function to callback with data.
     */
    on(name, listener) {

        if(!this.#events.hasOwnProperty(name)) {
            this.#events[name] = [];
        }

        this.#events[name].push(listener);
    }

    /**
     * Removes a listener from the listener array for the specified event. 
     * @param {string} name - The name of the listener to remove.
     * @param {function} listenerToRemove - The listener to remove.
     */
    removeListener(name, listenerToRemove) {

        if (!this.#events.hasOwnProperty(name)) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }

        const filterListeners = (listener) => listener !== listenerToRemove;

        this.#events[name] = this.#events[name].filter(filterListeners);

    }

    /**
     * Execute each of the listeners in order with the supplied arguments. 
     * @param {string} name - The name of the listener to call.
     * @param {object} data - The data object to pass back.
     */
    emit(name, data) {

        if (!this.#events.hasOwnProperty(name)) return;

        const emitEvents = (method) => {
            method(data);
        };

        this.#events[name].forEach(emitEvents);
    }

}