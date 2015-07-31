'use strict';

// import libraries
var requireDirectory = require('require-directory'),
    Hoek             = require('hoek'),
    Path             = require('path'),
    Handlebars       = require('handlebars'),
    CfgManager       = require('node-config-manager'),
    Fs               = require('fs-extra'),
    internals        = {}; // Declare internals >> see: http://hapijs.com/styleguide

// set internal variable
internals.designCfg = CfgManager.method.Design();
internals.routeCfg = CfgManager.method.Route();

// definition of plugin
internals.definition = {
    register: function(server, options, next)
    {
        // check options
        Hoek.assert(options, 'options are required for design'); // pre-auth checks
        Hoek.assert(options.dirname, 'options must contain dirname value to have good working directory'); // no directory

        // check configuration
        Hoek.assert(internals, 'internals are required for design'); // pre-auth checks
        Hoek.assert(internals.designCfg, 'internals must contain designCfg value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.stylesPath, 'designCfg must contain stylesPath value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.scriptsPath, 'designCfg must contain scriptsPath value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.fontsPath, 'designCfg must contain fontsPath value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.assetsPath, 'designCfg must contain assetsPath value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.faviconPath, 'designCfg must contain faviconPath value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.viewsPath, 'designCfg must contain viewsPath value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.layoutPath, 'designCfg must contain layoutPath value to have good configuration'); // no configuration
        Hoek.assert(internals.designCfg.partialsPath, 'designCfg must contain partialsPath value to have good configuration'); // no configuration
        if (CfgManager.get('env') === 'development')
        {
            Hoek.assert(internals.designCfg.bowerPath, 'designCfg must contain bowerPath value to have good configuration'); // no configuration
        }
        Hoek.assert(internals.designCfg.defaultContext, 'designCfg must contain defaultContext value to have good configuration'); // no configuration

        Hoek.assert(internals.routeCfg, 'internals must contain routeCfg value to have good configuration'); // no configuration
        Hoek.assert(internals.routeCfg.apiPath, 'routeCfg must contain apiPath value to have good configuration'); // no configuration
        Hoek.assert(internals.routeCfg.apiVersion, 'routeCfg must contain apiVersion value to have good configuration'); // no configuration
        Hoek.assert(internals.routeCfg.endPoints, 'routeCfg must contain endPoints value to have good configuration'); // no configuration
        Hoek.assert(internals.routeCfg.endPoints.home, 'endPoints must contain home value to have good configuration'); // no configuration

        // override options
        var override = {
            stylesPath: internals.designCfg.stylesPath,
            scriptsPath: internals.designCfg.scriptsPath,
            fontsPath: internals.designCfg.fontsPath,
            assetsPath: internals.designCfg.assetsPath,
            faviconPath: internals.designCfg.faviconPath,
            homeEndPoint: internals.routeCfg.apiPath + internals.routeCfg.apiVersion + internals.routeCfg.endPoints.home
        };

        if (CfgManager.get('env') === 'development')
        {
            override.bowerPath = internals.designCfg.bowerPath;
        }

        var opts = Hoek.applyToDefaults(options, override);

        // define view config
        var configView = {
            engines: {
                html: Handlebars.create()
            },
            path: Path.join(opts.dirname, internals.designCfg.viewsPath),
            context: internals.designCfg.defaultContext
        };

        // check if we have partials elements
        try
        {
            var partials = Fs.readdirSync(Path.join(opts.dirname, internals.designCfg.partialsPath));

            if (partials)
            {
                configView.partialsPath = Path.join(opts.dirname, internals.designCfg.partialsPath);
            }
        }
        catch(e)
        {
            server.log(['debug'], '< design.configView > No partials PATH found');
        }


        // check if we have layout element
        try
        {
            var layout = Fs.readdirSync(Path.join(opts.dirname, internals.designCfg.layoutPath));

            if (layout)
            {
                configView.layoutPath = Path.join(opts.dirname, internals.designCfg.layoutPath);
                configView.layout = true;
            }
        }
        catch(e)
        {
            server.log(['debug'], '< design.configView > No layout PATH found');
        }

        server.log(['debug'], '< design.configView >' + JSON.stringify(configView));

        // load views
        server.root.views(configView);

        // load routes
        internals.registerRoutes(server, opts, './route');

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
        server.log(['debug'], '< design.register > New routes found in "' + path + '" folder');

        for (var route in routes)
        {
            try
            {
                server.route('function' === typeof routes[route] ? new routes[route](options) : routes[route]);
                server.log(['debug'], '< design.register > Route "'+ route +'" in "'+ path +'" - OK');
            }
            catch(e)
            {
                server.log(['debug'], '< design.register > "'+ route +'" is not a valid route - May be a folder');

                var newPath = path + '/' + route;

                internals.registerRoutes(server, options, newPath);
            }
        }
    }
    else
    {
        server.log(['debug'], '< design.register > No routes found in "' + path + '" folder');
    }
};

// plugin informations
internals.definition.register.attributes = {
    pkg: require('./package')
};

// export plugin
module.exports = internals.definition;