'use strict';

// import libraries
var CfgManager = require('node-config-manager'),
    I18n       = require('hapi-basic-i18n'),
    Path       = require('path'),
    internals  = {}; // Declare internals >> see: http://hapijs.com/styleguide

// set internal variable
internals.i18nCfg = CfgManager.method.I18n();

// definition of plugin
internals.definition = {
    register: function(server, options, next)
    {
        // set good path
        internals.i18nCfg.locale_path = Path.join(options.dirname, internals.i18nCfg.locale_path);

        // register plugin
        server.register(
            {
                register: I18n,
                options: internals.i18nCfg
            },
            function (err)
            {
                next(err);
            }
        );
    }
};

// plugin informations
internals.definition.register.attributes = {
    pkg: require('./package')
};

// export plugin
module.exports = internals.definition;