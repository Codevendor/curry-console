'use strict';

/**
  * Checks if array only contains curryConsoleTypes.
  * @param {array} args The method arguments.
  * @returns {boolean} Whether the arguments only contain curryConsoleTypes.
  */
export function onlyCurryTypes(args) {

  if (!Array.isArray(args)) return false;

  for (let i = 0; i < args.length; i++) {

    switch(typeof args[i]) {
      
      case 'object':

        if(args[i]?.type !== 'curryConsoleType') return false;

        break;

      case 'function':

        if(!(/^[\s]{0,}\([\s]{0,}\.\.\.args[\s]{0,}\)[\s]{0,}=>[\s]{0,}{[\s]{0,}return[\s]{0,}new[\s]{0,}actionObject/gm.test(args[i]))) return false;
        break;

        default: return false;
    }    

  }

  return true;

}