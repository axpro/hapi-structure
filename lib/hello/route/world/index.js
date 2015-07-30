'use strict';

// import controller
var controller = require('../../controller/world'),
    Schema     = require('../../schema');

// export route
module.exports = {
    method: 'GET',
    path: '/hello/world',
    handler: controller,
    config: {
        cors:
        {
            methods: ['GET']
        },
        validate:
        {
            query: Schema.helloRequest
        }
    }
};