/* See LICENSE file for terms of use */
'use strict';

// import libraries
var Hapi             = require('hapi'),
    requireDirectory = require('require-directory'),
    CfgManager       = require('node-config-manager'),
    Async            = require('async'),
    Good             = require('good'),
    Hoek             = require('hoek'),
    _                = require('underscore'),
    internals        = {}; // Declare internals >> see: http://hapijs.com/styleguide

/** Constants **/
internals.defaultEnv = 'development';
internals.libDir = './lib/';
internals.configDir = './config';
internals.configs = ['api', 'good', 'route', 'plugin', 'i18n', 'design'];

/** methods to load plugins **/
internals.registerPlugins = function (server, cfg, callback)
{
    // check variables
    Hoek.assert(server, 'server are required to register plugins'); // pre-auth checks
    Hoek.assert(cfg, 'cfg are required to register plugins'); // pre-auth checks

    Hoek.assert(cfg.plugin, 'cfg must contain plugin value to have good configuration'); // no configuration

    Hoek.assert(cfg.route, 'cfg must contain route value to have good configuration'); // no configuration

    Hoek.assert(cfg.libDir, 'cfg must contain libDir value to have good configuration'); // no configuration

    Hoek.assert(cfg.plugin.pluginsWithoutPrefix, 'plugin cfg must contain pluginsWithoutPrefix value to have good configuration'); // no configuration
    Hoek.assert(cfg.plugin.overrideDirnameForPlugins, 'plugin cfg must contain overrideDirnameForPlugins value to have good configuration'); // no configuration

    Hoek.assert(cfg.route.apiPath, 'route cfg must contain apiPath value to have good configuration'); // no configuration
    Hoek.assert(cfg.route.apiVersion, 'route cfg must contain apiVersion value to have good configuration'); // no configuration

    // global variables
    var pluginsDir = cfg.libDir,
        plugins = requireDirectory(module, pluginsDir),
        registers = [],
        registersWithPrefix = [];

    // for each plugins
    Async.each(Object.keys(plugins),
        function (plugin, cb)
        {
            // check if dirname must be passed in options
            var options = {};

            if(Hoek.contain(cfg.plugin.overrideDirnameForPlugins, plugin))
            {
                options.dirname = __dirname;
            }

            // check if plugin must have route prefix
            if(Hoek.contain(cfg.plugin.pluginsWithoutPrefix, plugin))
            {
                // add plugin to register array
                registers.push({
                    register: require(pluginsDir + plugin),
                    options: options
                });
            }
            else
            {
                // add plugin to register array
                registersWithPrefix.push({
                    register: require(pluginsDir + plugin),
                    options: options
                });
            }

            cb();
        },
        function (err)
        {
            // check error process
            if (err)
            {
                callback(err);
            }
            else
            {
                Async.waterfall(
                    [
                        function(cb)
                        {
                            // register all plugins with prefix
                            server.register(registersWithPrefix, {routes:{prefix: cfg.route.apiPath + cfg.route.apiVersion}}, cb);
                        },
                        function(cb)
                        {
                            // register all plugins without prefix
                            server.register(registers, cb);
                        }
                    ],
                    function(err)
                    {
                        callback(err);
                    }
                );
            }
        }
    );
};

internals.registerGoodPlugin = function(server, cfg, callback)
{
    // check variables
    Hoek.assert(server, 'server are required to register plugins'); // pre-auth checks
    Hoek.assert(cfg, 'cfg are required to register plugins'); // pre-auth checks

    Hoek.assert(cfg.good, 'cfg must contain good value to have good configuration'); // no configuration

    server.register(
        {
            register: Good,
            options: cfg.good
        },
        function (err)
        {
            callback(err);
        }
    );
};

/** end methods to load plugins **/

// create initialization method
internals.init = function()
{
    // check variables
    Hoek.assert(internals, 'internals are required to initialize server'); // pre-auth checks

    Hoek.assert(internals.defaultEnv, 'internals must contain defaultEnv value to have good configuration'); // no configuration
    Hoek.assert(internals.configDir, 'internals must contain configDir value to have good configuration'); // no configuration
    Hoek.assert(internals.configs, 'internals must contain configs value to have good configuration'); // no configuration
    Hoek.assert(internals.libDir, 'internals must contain libDir value to have good configuration'); // no configuration

    // load config
    CfgManager.init({
        env: process.env.NODE_ENV || internals.defaultEnv,
        configDir: internals.configDir,
        camelCase: true
    });

    // add config files
    _.each(internals.configs, function(config)
    {
        CfgManager.addConfig(config);
    });

    // get config
    var apiCfg = CfgManager.method.Api(),
        routeCfg = CfgManager.method.Route(),
        pluginCfg = CfgManager.method.Plugin(),
        goodCfg = CfgManager.method.Good();

    // Create hapi server instance
    var server = new Hapi.Server();

    // adding a new connection that can be listened on
    server.connection(apiCfg);

    // load plugins + start server
    Async.waterfall(
        [
            function(cb)
            {
                // register log before all plugins
                internals.registerGoodPlugin(server, {good: goodCfg}, cb);
            },
            function(cb)
            {
                // register plugins
                internals.registerPlugins(server, {route: routeCfg, plugin: pluginCfg, libDir: internals.libDir}, cb);
            }
        ],
        function(err)
        {
            // check if error occurred during plugins registration
            if (err)
            {
                throw err;
            }

            // starting the server
            server.start(function (err)
            {
                // check if error occurred during server starting
                if (err)
                {
                    throw err;
                }

                server.log(['info'], '< Server > Server started at: ' + server.info.uri);
            });
        }
    );
};


// launch initialization
internals.init();