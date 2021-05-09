"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class CommentModel {
    constructor (db) {
        this.db = db;
    }

    //Creates a Comment
    createComment (openProject, author, commentText) {
        try {
            // Prepare the insert statement
            const sql = `INSERT INTO Comments (commentID, openProject, author, commentText, datePosted)
                         VALUES (@commentID, @openProject, @author, @commentText, @datePosted)             
            `;
            const addUserStmt = db.prepare(sql);
            
            // Create unique commentID
            let commentID = uuidV4();
            //Create Date
            let datePosted = Date.now();

            // attempt to add them to the database
            addUserStmt.run({commentID, openProject, author, commentText, datePosted});
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    //Gets All Comments for a Project
    getCommentByProject (openProject) {
        try {
            const sql = `SELECT commentID, author, commentText, datePosted
                         FROM Comments
                         WHERE openProject = @openProject
            `;
            const stmt = db.prepare(sql);
            return stmt.all({openProject});       
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    //Gets All Comments By An Author
    getCommentByAuthor (author) {
        try {
            const sql = `SELECT commentID, openProject, commentText, datePosted
                         FROM Comments
                         WHERE author = @author
            `;
            const stmt = db.prepare(sql);
            return stmt.all({author}); 
        }catch (err) {
            console.error(err);
            return false;
        }
    }
    
    // Deletes a Comment
    deleteComment (commentID) {
        try {
            const sql = `DELETE FROM Comments
                         WHERE commentID = @commentID
            `;
            const stmt = db.prepare(sql);
            stmt.run({commentID});
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

exports.commentModel = new CommentModel(db);