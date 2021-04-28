"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class UserModel {
    constructor (db) {
        this.db = db;
    }

    createUser (user) {
        try {
            // Prepare the insert statement
            const sql = `INSERT INTO Users (userID, username, passwordHash, email)
                         VALUES (@userID, @username, @passwordHash, @email)             
            `;
            const addUserStmt = db.prepare(sql);
            
            // Create the user's id and add it to the user object
            user.userID = uuidV4();
            // attempt to add them to the database
            addUserStmt.run(user);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    changeEmailAddress (newEmailAddr, userID) {
        try{
            const sql = `
                UPDATE Users
                SET
                    email=@newEmailAddr
                WHERE
                    userID=@userID
            `;
            const stmt = db.prepare(sql);
            stmt.run({newEmailAddr, userID});
            return true;
        } catch (err){
            console.error(err);
            return false;
        }
    }

    changeUsername (newUsername, userID) {
        try{
            const sql = `
                UPDATE Users
                SET
                    username=@newUsername
                WHERE
                    userID=@userID
            `;
            const stmt = db.prepare(sql);
            stmt.run({newUsername, userID});
            return true;
        } catch (err){
            console.error(err);
            return false;
        }
    }

    upgradeToAdmin (userID) {
        try{
            const sql = `
                UPDATE Users
                SET
                    role=1
                WHERE
                    userID=@userID
            `;
            const stmt = db.prepare(sql);
            stmt.run({userID});
            return true;
        } catch (err){
            console.error(err);
            return false;
        }
    }

    revokeAdmin (userID) {
        try{
            const sql = `
                UPDATE Users
                SET
                    role=0
                WHERE
                    userID=@userID
            `;
            const stmt = db.prepare(sql);
            stmt.run({userID});
            return true;
        } catch (err){
            console.error(err);
            return false;
        }
    }

    emailVerified (userID) {
        try{
            const sql = `
                UPDATE Users
                SET
                    didVerifyEmail=1
                WHERE
                    userID=@userID
            `;
            const stmt = db.prepare(sql);
            stmt.run({userID});
            return true;
        } catch (err){
            console.error(err);
            return false;
        }
    }

    deleteUser (userID) {
        try{
            const sql = `DELETE FROM Users WHERE userID=@userID`;
            const stmt = db.prepare(sql);
            stmt.run({userID});
            return true;
        } catch(err){
            console.error(err);
            return false;
        }
    }

    getPasswordHash (email) {
        try{
            const sql = `SELECT passwordHash FROM Users WHERE email=@email`;
            const stmt = db.prepare(sql);
            return stmt.get({email});
        } catch(err){
            console.error(err);
            return false;
        }
    }

    getUserData (userID) {
        try{
            const sql = `SELECT userID, username, role, email, didVerifyEmail
                         FROM Users 
                         WHERE userID = @userID
            `;
            const stmt = db.prepare(sql);
            return stmt.get({userID});
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    getUserDataByEmail(email){
        try {
            const sql = `
                SELECT
                    userID, username, role
                FROM
                    Users
                WHERE
                    email=@email
            `;
            return db.prepare(sql).get({email});
        } catch(err){
            console.error(err);
            return false;
        }
    }

    // really just used for testing
    getUsers(){
        try{
            const sql = `
                SELECT *
                FROM Users
            `;
            const stmt = db.prepare(sql);
            return stmt.all();
        } catch(err) {
            console.error(err);
            return false;
        }
    }
}

exports.userModel = new UserModel(db);