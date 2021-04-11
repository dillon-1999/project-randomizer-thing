"use strict";

const express = require("express");
const usersRouter = express.Router();
const argon2 = require("argon2");
const { userModel } = require("../Models/UserModel");
const {schemas, VALIDATION_OPTIONS} = require("../validators/allValidators");

usersRouter.post("/", async (req, res) => {
	console.log("POST /users");
	const {value, error} = schemas.userSchema.validate(req.body, VALIDATION_OPTIONS);
	
	if (error) {
        const errorMessages = error.details.map( error => error.message );
        return res.status(400).json(errorMessages);
    } 
	
	const {email, password, username} = value;

	try {
		const passwordHash = await argon2.hash(password, {hashLength: 5});
		const userAdded = userModel.createUser({
			username, 
			passwordHash,
			email
		});
	
		if (userAdded) {
			res.redirect("/login.html");
		} else { // something went wrong
			res.sendStatus(500); // 500 Internal Server Error
		}
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
});


usersRouter.post("/login", async (req, res) => {
    const {value, error} = schemas.loginSchema.validate(req.body, VALIDATION_OPTIONS);

    if(error){
        const errorMessages = error.details.map(error => error.message);
        return res.status(400).json(errorMessages);
    }

    const {email, password} = value;

    try {
		const row = userModel.getPasswordHash(email); 

		if (!row) {
			return res.sendStatus(400);
		}

		const {passwordHash} = row;
		
		if ( await argon2.verify(passwordHash, password) ) {
			const { userID, username, role } = userModel.getUserDataByEmail(email);
			req.session.regenerate((err) => {
				if(err){
					res.sendStatus(401);
					return console.error(err);
				}
				req.session.userID = userID;
				req.session.email = email;
				req.session.username = username;
				req.session.role = role;
				req.session.isLoggedIn = true;
				res.redirect('/homepage.html'); // show different page for user/admins?
			});
		} else {
			return res.sendStatus(400);
		}
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
    
});

// sends id over route params
usersRouter.delete('/remove', (req, res) =>{
	if(req.session.role !== 1){ // must be a admin
		return res.sendStatus(404);
	}
	// TODO: add in validation for the route param? maybe not
	try {
		const deleted = userModel.deleteUser(req.params.userID);
		if(deleted){
			res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	} catch(err) {
		console.error(err);
		res.sendStatus(500);
	}
});

usersRouter.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.sendStatus(500);
			return console.error(err);
		}
		res.redirect('/login.html');
	})
    console.log(req.session)
});

usersRouter.post('/upgrade', (req, res) => {
	if(req.session.role !== 1){
		return res.sendStatus(404);
	}
	
	try {
		const upgraded = userModel.upgradeToAdmin(req.params.userID);
		if(upgraded){
			res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	} catch(err) {
		console.error(err);
		return res.sendStatus(500);
	}
});

usersRouter.post('/revoke', (req, res) => {
	if(req.session.role !== 1){
		return res.sendStatus(404);
	}
	
	try {
		const revoked = userModel.revokeAdmin(req.params.userID);
		if(revoked){
			res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	} catch(err) {
		console.error(err);
		return res.sendStatus(500);
	}
});

module.exports = usersRouter;