'use strict';

/**
  * Delays a console.log message.
  * @param {array} ms The milliseconds to wait.
  * @param {array} cb The callback to fire.
  */
export function actionDelay(ms, cb) {

    setTimeout(()=>{

        cb();

    }, ms);

}