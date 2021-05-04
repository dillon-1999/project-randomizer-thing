"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4;
class OpenProjectsModel {
    constructor (db)
    {
        this.db = db;
    }

    createOpenProject (openProject)
    {
        try
        {
            const sql = `
                INSERT INTO OpenProjects
                    (openID, project, author, startedOn)
                VALUES
                    (@openID, @project, @author, @startedOn)`;
            const stmt = db.prepare(sql);
            openProject.openID = uuidV4();
            openProject.startedOn = Date.now();

            stmt.run(openProject);
            return true;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }

    uploadSingleFile(fileHash, project){
        try {
            const sql = `UPDATE OpenProjects
                         SET 
                         fileHash = @filehash
                         finishedOn = @finishedOn
                         isFinished = 1
                         WHERE
                         project = @projectID`;
            const finishedOn = Date.now();
            return db.prepare(sql).run({fileHash, finishedOn, project});
        } catch (err){
            console.error(err);
            return false;
        }
    }

    findProjectsByUser (userID)
    {
        try 
        {
            const sql = `
                SELECT *
                FROM OpenProjects
                WHERE author = @userID`;
            const stmt = db.prepare(sql);
            return stmt.all({userID});
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    //Find projects by the ProjectID (not OpenID)
    /* dillon: 
        changed param to projectID so the object could be simplified
        from project.projectID to projectID
    */
    findProjectsByProjectID (projectID)
    {
        try
        {
            const sql = `
                SELECT *
                FROM OpenProjects
                WHERE project = @projectID`;
            const stmt = db.prepare(sql);
            return stmt.all({projectID});
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    findFinishedProjects ()
    {
        try
        {
            const sql = `
                SELECT *
                FROM OpenProjects
                WHERE isFinished = 0`;
            const stmt = db.prepare(sql);
            return stmt.all();
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    markProjectAsFinished (openID)
    {
        try
        {
            const sql = `
                UPDATE OpenProjects
                SET 
                    finishedOn = @date,
                    isFinished = 1
                WHERE openID = @openID`;
            const stmt = db.prepare(sql);
            const date = Date.now();

            stmt.run({date, openID});
            return true;            
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }

    getOpenProjects(){
        try{
            const sql = `SELECT * FROM OpenProjects`;;
            return db.prepare(sql).all();
        } catch(err) {
            console.error(err);
            return false;
        }
    }
}

const openProjects = new OpenProjectsModel(db);
// const proj = {
//     project: 'a2196aed-3466-44ed-9cab-a046adfed0ea',
//     author: '5f2007ca-a9a6-4d62-b7f1-6f2eee076e3c'
// }
// openProjects.createOpenProject(proj)
console.log()
exports.openProjectsModel = new OpenProjectsModel(db);