'use strict';

// import libraries
var requireDirectory = require('require-directory'),
    internals        = {}; // Declare internals >> see: http://hapijs.com/styleguide

// definition of plugin
internals.definition = {
    register: function(server, options, next)
    {
        // load routes
        internals.registerRoutes(server, options, './route');

        next();
    }
};

/**
 * Function to register server routes
 */
internals.registerRoutes = function(server, options, path)
{
    // routes folder
    var routes = requireDirectory(module, path);

    if (routes)
    {
        server.log(['debug'], '< hello.register > New routes found in "' + path + '" folder');

        for (var route in routes)
        {
            try
            {
                server.route('function' === typeof routes[route] ? routes[route](options) : routes[route]);
                server.log(['debug'], '< hello.register > Route "'+ route +'" in "'+ path +'" - OK');
            }
            catch(e)
            {
                server.log(['debug'], '< hello.register > "'+ route +'" is not a valid route - May be a folder');

                var newPath = path + '/' + route;

                internals.registerRoutes(server, options, newPath);
            }
        }
    }
    else
    {
        server.log(['debug'], '< hello.register > No routes found in "' + path + '" folder');
    }
};

// plugin informations
internals.definition.register.attributes = {
    pkg: require('./package')
};

// export plugin
module.exports = internals.definition;