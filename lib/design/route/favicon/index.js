'use strict';

// import libraries
var Path = require('path'),
    Hoek = require('hoek');

// export route
module.exports = function(options)
{
    // check options
    Hoek.assert(options, 'options are required for favicon.ico route'); // pre-auth checks
    Hoek.assert(options.dirname, 'options must contain dirname value to have good working directory'); // no directory
    Hoek.assert(options.faviconPath, 'options must contain faviconPath value to have good configuration'); // no configuration

    return {
        method: 'GET',
        path: '/favicon.ico',
        handler: {
            file: Path.join(options.dirname, options.faviconPath)
        },
        config: {
            cors:
            {
                methods: ['GET']
            }
        }
    };
};