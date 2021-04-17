"use strict";

const express = require("express");
const openProjectsRouter = express.Router();
const { openProjectModel } = require("../Models/OpenProjectModel");
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now());
    }
});

let upload = multer({storage});

// userID: route param
// openProjectsRouter.post('/uploadSingle', upload.single('file'), (req, res) => {
//     try{
//         console.log(req.file)
//         res.send("Single File Upload Sucess")
//     } catch(err){
//         res.send(err);
//     }
// });

openProjectsRouter.post('/uploadMultiple', upload.array('files', 5), (req, res) => {
    try{
        console.log(req.files)
        res.send("File Upload Sucess")
    } catch(err){
        res.send(err);
    }
});

module.exports = openProjectsRouter;