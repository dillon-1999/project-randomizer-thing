"use strict";

const express = require("express");
const openProjectsRouter = express.Router();
const { openProjectsModel } = require("../Models/OpenProjectModel");
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


// idk, send the userID and projectID via query
openProjectsRouter.post('/openProject', (req, res) => {
    console.log("POST /openProject");
    if(!req.session.isLoggedIn){
        return res.sendStatus(403);
    }
    const {project, author} = req.query;
    try{
        const didOpen = openProjectsModel.createOpenProject({project, author});
        if(didOpen){
            return res.sendStatus(200);
        } else {
            return res.sendStatus(500);
        }
    } catch (err){
        console.error(err);
        return res.sendStatus(500);
    }
});


openProjectsRouter.post('/uploadMultiple', upload.array('files', 5), (req, res) => {
    try{
        console.log(req.files)
        res.send("File Upload Sucess")
    } catch(err){
        res.send(err);
    }
});



module.exports = openProjectsRouter;