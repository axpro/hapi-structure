/* See LICENSE file for terms of use */
'use strict';

// import libraries
var Joi = require('joi');

module.exports = {
    helloRequest : Joi.object().keys({
        user: Joi.string().default('NJL')
    }).required(),
    helloResponse: Joi.object().keys({
        statusCode: Joi.number().valid(200).required(),
        message: Joi.string().required()
    }).required()
};