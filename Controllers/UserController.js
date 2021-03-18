"use strict";

const express = require("express");
const usersRouter = express.Router();
const argon2 = require("argon2");
const { userModel } = require("../Models/UserModel");

usersRouter.post('/', async(req,res) => {
    // TODO: run password against pwned
    const {username, password, email} = req.body;
    try{
        const passwordHash = await argon2.hash(password);
        const userAdded = userModel.createUser({
            username, passwordHash, email
        });
        if(userAdded){
            res.sendStatus(200);
        } else{
            console.log('error');
            res.sendStatus(500);
        }
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = usersRouter;