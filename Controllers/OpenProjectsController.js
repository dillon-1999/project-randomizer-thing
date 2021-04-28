"use strict";

const express = require("express");
const openProjectsRouter = express.Router();
const { openProjectsModel } = require("../Models/OpenProjectModel");
const { userModel } = require("../Models/UserModel");
const { projectsModel } = require("../Models/ProjectModel");
const crypto = require("crypto");

const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const randomName = crypto.randomBytes(12).toString('hex');
        const [extension] = file.originalname.split(".").slice(-1);
        cb(null, `${randomName}.${extension}`);
    }
    // we arent filtering. they can upload whatever at this point
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

openProjectsRouter.get('/upload', (req, res) => {
    res.render('upload', {session: req.session});
});

openProjectsRouter.get("/getAllOpenProjects", (req, res) => {
    const projects = openProjectsModel.getOpenProjects();
    const success = (projects) ? true : false;
    res.render("getOpenProjects", {session: req.session, projects, success})
});

module.exports = openProjectsRouter;