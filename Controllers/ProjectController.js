"use strict";

const express = require("express");
const projectsRouter = express.Router();
const { projectModel } = require("../Models/ProjectModel");

module.exports = projectsRouter;