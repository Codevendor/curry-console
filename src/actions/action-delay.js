'use strict';

import { type_of } from "../helpers/type-of.js";

/**
  * Delays a console.log message.
  * @param {(number|string)} ms The milliseconds to wait.
  * @param {function} cb The callback to fire.
  */
export function actionDelay(ms, cb) {

  if (type_of(ms, true) !== 'string' &&  type_of(ms, true) !== 'number') throw new TypeError(`Method actionDelay has incorrect type for first parameter (ms), must be a number or string number '1000'.`);
  if (type_of(cb) !== 'function') throw new TypeError(`Method actionDelay has incorrect type for second parameter (cb), must be a function.`);

  ms = parseInt(ms);

  setTimeout(() => {

    cb();

  }, ms);

}