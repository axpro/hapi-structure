'use strict';

module.exports = function(request, reply)
{
    // get query parameters
    var query = request.query;

    request.log(['debug'], 'START < controller.helloJSON > Params => ' + JSON.stringify(query));

    // create response object
    var Response = Object.create(null);

    // add properties
    Object.defineProperties(Response, {
        statusCode: {
            value: 200,
            enumerable: true
        },
        message: {
            value: request.i18n('WELCOME', query.user),
            enumerable: true
        }
    });

    // return response in JSON format
    reply(Response);

    request.log(['debug'], 'END < controller.helloWorld > Response => ' + JSON.stringify(Response));
};