'use strict';

// import controller
var controller = require('../../controller/json'),
    Schema     = require('../../schema');

// export route
module.exports = {
    method: 'GET',
    path: '/hello/json',
    handler: controller,
    config: {
        cors:
        {
            methods: ['GET']
        },
        validate:
        {
            query: Schema.helloRequest
        },
        response: {
            status: {
                200: Schema.helloResponse
            }
        }
    }
};