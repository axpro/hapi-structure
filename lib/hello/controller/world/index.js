'use strict';

module.exports = function(request, reply)
{
    // get query parameters
    var query = request.query;

    request.log(['debug'], 'START < controller.helloWorld > Params => ' + JSON.stringify(query));

    // display client/views/hello.html
    reply.view('hello', {user: query.user, welcome: 'WELCOME'});

    request.log(['debug'], 'END < controller.helloWorld > View displayed in your browser');
};