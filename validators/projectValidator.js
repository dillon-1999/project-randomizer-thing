"use strict";
const Joi = require('joi');

exports.projectSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(10).max(250).required(),
    difficulty: Joi.number().integer().min(1).max(5).required()
});