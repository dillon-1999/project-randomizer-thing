"use strict";

const VALIDATION_OPTIONS = {
	abortEarly: false,
	stripUnknown: true, 
	errors: {
		escapeHtml: true,
	}
};

const {userSchema} = require("./userValidator");
const {loginSchema} = require("./loginValidator");
const {projectSchema} = require("./projectValidator");

const schemas = {
    userSchema,
	loginSchema,
	projectSchema
};

exports.schemas = schemas;
exports.VALIDATION_OPTIONS = VALIDATION_OPTIONS;