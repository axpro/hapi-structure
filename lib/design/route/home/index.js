'use strict';

// import libraries
var Hoek = require('hoek');

// export route
module.exports = function(options)
{
    // check options
    Hoek.assert(options, 'options are required for favicon.ico route'); // pre-auth checks
    Hoek.assert(options.homeEndPoint, 'options must contain homeEndPoint value to have good working directory'); // no directory

    return {
        method: 'GET',
        path: '/',
        handler: function(request, reply)
        {
            reply.redirect(options.homeEndPoint);
        },
        config: {
            cors:
            {
                methods: ['GET']
            }
        }
    };
};