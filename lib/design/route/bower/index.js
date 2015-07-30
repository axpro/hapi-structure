'use strict';

// import libraries
var Path       = require('path'),
    Hoek       = require('hoek'),
    CfgManager = require('node-config-manager'),
    Boom       = require('boom');

// export route
module.exports = function(options)
{
    // specific handler for dev or prod
    var handler;

    if (CfgManager.get('env') === 'development')
    {
        // check options
        Hoek.assert(options, 'options are required for scripts routes'); // pre-auth checks
        Hoek.assert(options.dirname, 'options must contain dirname value to have good working directory'); // no directory
        Hoek.assert(options.bowerPath, 'options must contain bowerPath value to have good configuration'); // no configuration

        handler = {
            directory: {
                path: Path.join(options.dirname, options.bowerPath)
            }
        };
    }
    else
    {
        handler = function(request, reply)
        {
            return reply(Boom.notFound());
        };
    }

    return {
        method: 'GET',
        path: '/bower_components/{somethings*}',
        handler: handler,
        config: {
            cors:
            {
                methods: ['GET']
            }
        }
    };
};