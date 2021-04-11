"use strict";

const express = require("express");
const openProjectsRouter = express.Router();
const { openProjectModel } = require("../Models/OpenProjectModel");

// this is fukt, don't look at it

// openProjectsRouter.post('/upload', upload.single('file'), (req, res, next) => {
//     const file = req.file;
//     if(!file){
//         const error = new Error('please upload a file!');
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send(file);
// })
module.exports = openProjectsRouter;