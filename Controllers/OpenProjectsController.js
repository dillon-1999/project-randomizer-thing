"use strict";

const express = require("express");
const openProjectsRouter = express.Router();
const { openProjectModel } = require("../Models/OpenProjectModel");

module.exports = openProjectsRouter;