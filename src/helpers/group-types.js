'use strict';

/**
 * Groups the curry types into separate arrays by names.
 * @param {array} args - The parameter array to use.
 * @param {array} defaults - The defaults for log, info, warn and error.
 * @returns {object} - An array with the grouped types.
 */
export function groupTypes(args, defaults) {

    const groups = {
        'actionObject':[],
        'colorObject': [],
        'labelObject': []
    };

    // Parse defaults
    if(Array.isArray(defaults)) {
        
        defaults.map(item => {

            if(groups.hasOwnProperty(item.name)) {
                groups[item.name].push(item);
            }
    
        });

    }

    if (!Array.isArray(args)) return groups;

    args.map(item => {

        if(groups.hasOwnProperty(item.name)) {
            groups[item.name].push(item);
        }

    });

    return groups;

}