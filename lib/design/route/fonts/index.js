'use strict';

// import libraries
var Path = require('path'),
    Hoek = require('hoek');

// export route
module.exports = function(options)
{
    // check options
    Hoek.assert(options, 'options are required for fonts routes'); // pre-auth checks
    Hoek.assert(options.dirname, 'options must contain dirname value to have good working directory'); // no directory
    Hoek.assert(options.fontsPath, 'options must contain fontsPath value to have good configuration'); // no configuration

    return {
        method: 'GET',
        path: '/fonts/{somethings*}',
        handler: {
            directory: {
                path: Path.join(options.dirname, options.fontsPath)
            }
        },
        config: {
            cors:
            {
                methods: ['GET']
            }
        }
    };
};