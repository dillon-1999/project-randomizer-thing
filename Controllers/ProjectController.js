"use strict";

const express = require("express");
const projectsRouter = express.Router();
const { projectModel } = require("../Models/ProjectModel");
const {schemas, VALIDATION_OPTIONS} = require("../validators/allValidators");


projectsRouter.post("/create", (req, res) =>{
    console.log("POST /projects/create");
    const {value, error} = schemas.projectSchema.validate(req.body, VALIDATION_OPTIONS);

    if(error){
        const errorMessages = error.details.map( err => err.message);
        return res.status(400).json(errorMessages);
    }

    const {name, description, difficulty} = value;
    console.log(value)
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
module.exports = projectsRouter;