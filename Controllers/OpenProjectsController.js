"use strict";

const express = require("express");
const openProjectsRouter = express.Router();
const { openProjectsModel } = require("../Models/OpenProjectModel");
const { userModel } = require("../Models/UserModel");
const { projectModel } = require("../Models/ProjectModel");
const { commentModel } = require("../Models/CommentModel");
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
openProjectsRouter.post('/uploadSingle/:openID', upload.single('file'), (req, res) => {
    try{
        const didUpload = openProjectsModel.uploadSingleFile(req.file.filename, req.params.openID);
        if(didUpload){
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    } catch(err){
        res.send(err);
    }
});

openProjectsRouter.post('postComment/', (req,res) => {
    console.log("POST /postComment");
    if(!req.session.isLoggedIn){
        return res.sendStatus(403);
    }
    
    const {openProjectID, commentText} = req.body;
    const author = req.session.userID;
    try{
        commentModel.createComment(openProjectID, author, commentText);
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }

})


// idk, send the userID and projectID via query
openProjectsRouter.post('/openProject', (req, res) => {
    console.log("POST /openProject");
    if(!req.session.isLoggedIn){
        return res.sendStatus(403);
    }
    const {project} = req.body;
    const author = req.session.userID;
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


// openProjectsRouter.post('/uploadMultiple', upload.array('files', 5), (req, res) => {
//     try{
//         console.log(req.files)
//         res.send("File Upload Sucess")
//     } catch(err){
//         res.send(err);
//     }
// });

// EJS Router Endpoints
//Finds all User Projects for Admins
openProjectsRouter.get("/getAllOpenProjects", (req, res) => {
    let projects = openProjectsModel.getOpenProjects();
    for(let i = 0; i < projects.length; i++)
    {
        let { username } = userModel.getUserNameByID(projects[i].author);
        projects[i].author = username;
    }
    const success = (projects) ? true : false;
    res.render("getOpenProjects", {session: req.session, projects, success})
});

openProjectsRouter.get("/upload", (req, res) => {
    res.render("upload", {session: req.session})
});

openProjectsRouter.get("/new", (req, res) => {
    res.render("new", {session: req.session})
});

//Find Projects specific to that user
openProjectsRouter.get("/usersOpenProjects", (req, res) => {
    console.log(req.session.userID);
    const projects = openProjectsModel.findProjectsByUser(req.session.userID);
    for(let i = 0; i < projects.length; i++){
        // console.log(projects[i].project)
        let project = projectModel.findProjectByProjectID(projects[i].project);
        projects[i].name = project.name;
        projects[i].difficulty = project.difficulty;
        projects[i].description = project.description;
    }
    res.render("usersOpenProjects", {session: req.session, projects});
});

//Find ALL Projects for Users
openProjectsRouter.get("/viewAllProjects", (req, res) => {
    let projects = openProjectsModel.getOpenProjects();
    for(let i = 0; i < projects.length; i++)
    {
        let { username } = userModel.getUserNameByID(projects[i].author);
        projects[i].author = username;
    }
    res.render("viewAllProjects", {session: req.session, projects})
});

//View Project Comments
openProjectsRouter.get("/:projectID/comments", (req, res) => {
    const projectID = req.params.projectID;
    let project = openProjectsModel.findProjectsByProjectID(projectID);
    let comments = commentModel.getCommentByProject(projectID);

    project.authorName = userModel.getUserNameByID(project.author);

    for(let i = 0; i < comments.length; i++)
    {
        comments[i].author = userModel.getUserNameByID(comments[i].author);
    }

    res.render("comments", {session: req.session}, project, {comments})
});

module.exports = openProjectsRouter;