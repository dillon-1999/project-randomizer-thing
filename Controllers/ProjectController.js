"use strict";

const express = require("express");
const projectsRouter = express.Router();
const { projectModel } = require("../Models/ProjectModel");
const {schemas, VALIDATION_OPTIONS} = require("../validators/allValidators");


projectsRouter.post("/create", (req, res) =>{
    
    if(req.session.role !== 1){
        return res.sendStatus(404)
    }
    
    console.log("POST /projects/create");
    const {value, error} = schemas.projectSchema.validate(req.body, VALIDATION_OPTIONS);

    if(error){
        const errorMessages = error.details.map( err => err.message);
        return res.status(400).json(errorMessages);
    }

    const {name, description, difficulty} = value;
    
    try{
        const projAdded = projectModel.createProject({
            name, description, difficulty
        });

        if(projAdded){
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch(err){
        console.error(err);
        return res.sendStatus(500);
    }
});

projectsRouter.patch("/updateProject", (req, res) => {
    if(req.session.role !== 1){
        return res.sendStatus(403);
    }

    // TODO: validate this
    const {projectID, name, description, difficulty} = req.body;
    
    try {
        if(name){
            const updateName = projectModel.modifyName(name, projectID);
        }
        if(description){
            const updateDescription = projectModel.modifyDescription(description, projectID);
        }
        if(difficulty){
            const updateDifficulty = projectModel.modifyDifficulty(difficulty, projectID);
        }
        res.sendStatus(200);
    } catch(err){
        console.error(err);
        return res.sendStatus(500);
    }
    
});

projectsRouter.delete("/deleteProject", (req, res) => {
    if(req.session.role !== 1){
        return res.sendStatus(404);
    }
    
    const { projectID } = req.params.projectID;
    try {
        const deleted = projectModel.deleteProject(projectID);
        if(deleted){
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});
module.exports = projectsRouter;